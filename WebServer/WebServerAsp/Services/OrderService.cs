using System.Net.Mail;
using TouristСenterLibrary.Entity;
using t = TouristСenterLibrary.Entity;
using WebServerAsp.Models;
using WebServerAsp.Repositories;
using System.Net;
using Microsoft.EntityFrameworkCore;
using TouristСenterLibrary;

namespace WebServerAsp.Services
{
    public class OrderService : IOrderRepository
    {
        private readonly ApplicationContext _context;

        public OrderService(ApplicationContext context)
        {
            _context = context;
        }
        public bool AddOrder(NewOrderModel body,User user)
        {
            try
            {
                var touristGroup = new TouristGroup(user, body.peopleAmount, body.childrenAmount);
                if (body.teammates != null)
                {
                    foreach (var teammate in body.teammates)
                    {
                        touristGroup.ParticipantsList.Add(new Participant(_context.User.First(u => u.ID == teammate.User.ID)));
                    }
                }

                if (body.participants != null)
                {
                    foreach (var participant in body.participants)
                    {
                        if (_context.User.Any(u => u.PhoneNumber == participant.phone))
                        {
                            touristGroup.ParticipantsList.Add(new Participant(_context.User.First(u => u.PhoneNumber ==participant.phone)));
                        }
                        else
                        {
                            var participantUser = new User(participant.surname, participant.name, participant.phone)
                            {
                                Middlename = participant.middlename == "" ? null : participant.middlename
                            };
                            touristGroup.ParticipantsList.Add(new Participant(participantUser));
                        }
                    }
                }
                ApplicationType applicationType;
                if (user.NameOfCompany != null)
                {
                    applicationType = _context.ApplicationType.First(a => a.ID == 2);
                }
                else
                {
                    applicationType = _context.ApplicationType.First(a => a.ID == 1);
                }

                var employee = _context.Employee.First(e => e.ID == 1);
                var route = _context.Route.Include(r => r.CheckpointStart).Include(r => r.CheckpointFinish).FirstOrDefault(r => r.ID == body.route.ID);
                Instructor instructor = null;
                if (body.instructor != null)
                {
                    instructor =_context.Instructor.Include(i => i.InstructorGroups).First(i => i.ID == body.instructor.ID);
                }

                var order = new Order()
                {
                    ApplicationType = applicationType,
                    Employee = employee,
                    Route = route,
                    TouristGroup = touristGroup,
                    WayToTravel = body.wayToTravel,
                    FoodlFeatures = body.allergyComment,
                    EquipmentFeatures = body.equipmentComment,
                    StartTime = DateTime.SpecifyKind(DateTime.Parse(body.dateStart), DateTimeKind.Utc),
                    FinishTime =DateTime.SpecifyKind(DateTime.Parse(body.dateFinish), DateTimeKind.Utc),
                    Status = "Активна",
                    HermeticBagAmount = body.hermeticBag,
                    IndividualTentAmount = body.personalTent,
                    Instructor = instructor,
                    IsPhotograph = body.isPhotograph
                };
                
                route.Popularity += 1;
                try
                {
                    _context.Order.Add(order);
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }

                WordHelper contractHelper = null;
                string fileName = "";
                if (user.NameOfCompany != null)
                {
                    contractHelper = new WordHelper("companyContract.docx");
                    var items = new Dictionary<string, string>()
                {
                    { "<ROUTE>", order.Route.Name },
                    { "<COMPANY>", order.TouristGroup.User.NameOfCompany },
                    { "<DATESTART>", order.StartTime.ToString("d") },
                    { "<DATEFINISH>", order.FinishTime.ToString("d")},
                    { "<PEOPLEAMOUNT>", order.TouristGroup.PeopleAmount.ToString()},
                    { "<DATANOW>", DateTime.Now.ToString("d") },
                };
                    fileName = contractHelper.AddClontract(items);

                }
                else
                {
                    contractHelper = new WordHelper("familyContract.docx");
                    var items = new Dictionary<string, string>()
                {
                    { "<ROUTE>", order.Route.Name },
                    { "<FIO>", order.TouristGroup.User.GetFullName()},
                    { "<DATESTART>", order.StartTime.ToString("d") },
                    { "<DATEFINISH>", order.FinishTime.ToString("d")},
                    { "<PEOPLEAMOUNT>", order.TouristGroup.PeopleAmount.ToString()},
                    { "<DATANOW>", DateTime.Now.ToString("d") },
                };
                    fileName = contractHelper.AddClontract(items);
                }
                var from = new MailAddress("tourist-center-vyatsu@mail.ru", "Администрация туристического центра");
                var to = new MailAddress(user.Email, "Пользователь");
                var msg = new MailMessage(from, to);
                msg.Subject = "Заявка подана успешно!";
                msg.Attachments.Add(
                    new Attachment(fileName));
                msg.Body = "Договор на оказание улуг.";
                using (var smtp = new SmtpClient("smtp.mail.ru", 587))
                {
                    smtp.Credentials = new NetworkCredential("tourist-center-vyatsu@mail.ru", "PgbQ8YpGhzZzuWMJkU4p");
                    smtp.EnableSsl = true;
                    smtp.Send(msg);
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<OrderModel> GetOrders(int userId)
        {
            List<Order.OrderView> orders = 
                (from o in _context.Order
                        .Include(o => o.TouristGroup)
                        .ThenInclude(o => o.User)
                        .Include(o => o.TouristGroup)
                        .ThenInclude(o => o.ParticipantsList)
                        .ThenInclude(o =>o.User)
                    select new Order.OrderView()
                    {
                        ID = o.ID,
                        DateTime = o.StartTime.ToString("d"),
                        FinishTime = o.StartTime.ToString("d"),
                        RouteName = o.Route.Name,
                        WayToTravel = o.WayToTravel,
                        TouristGroup = o.TouristGroup.User.GetCompanyNameForOrder(),
                        TouristGroupID = o.TouristGroup.ID,
                        PeopleAmount = o.TouristGroup.PeopleAmount,
                        ApplicationTypeName = o.ApplicationType.Name,
                        ChildrenAmount = o.TouristGroup.ChildrenAmount,
                        Status = o.Status,
                        IsListParticipants = false
                    }).ToList();
            foreach (var l in orders)
            {
                var touristGroup = _context.TouristGroup.Include(t=>t.User).Where(c => c.ID == l.TouristGroupID).FirstOrDefault();
                _context.Participant.Where(p => p.TouristGroupID == l.TouristGroupID).Load();
                l.Users.Add(touristGroup.User);
                foreach (var participant in touristGroup.ParticipantsList)
                {
                    l.Users.Add(participant.User);
                }
            }
            orders = orders.Where(o => o.Users.Contains(_context.User.First(u => u.ID == userId)) && o.Status == "Активна").ToList();
            var ordersModel = new List<OrderModel>();
            foreach (var order in orders)
            {
                ordersModel.Add(new OrderModel(order));
            }
            return ordersModel;
        }

        public  Order.OrderView? GetViewById(int orderId)
        {
            try
            {
                Order.OrderView? order = (from o in _context.Order
                                    .Include(o => o.TouristGroup)
                                    .ThenInclude(o => o.User)
                                    .Include(o => o.TouristGroup)
                                    .ThenInclude(o => o.ParticipantsList)
                                    .ThenInclude(o => o.User)
                                    .Where(o=>o.ID == orderId)
                                        select new Order.OrderView()
                                        {
                                            ID = o.ID,
                                            DateTime = o.StartTime.ToString("d"),
                                            FinishTime = o.FinishTime.ToString("d"),
                                            RouteName = o.Route.Name,
                                            WayToTravel = o.WayToTravel,
                                            TouristGroup = o.TouristGroup.User.GetCompanyNameForOrder(),
                                            TouristGroupID = o.TouristGroup.ID,
                                            PeopleAmount = o.TouristGroup.PeopleAmount,
                                            ApplicationTypeName = o.ApplicationType.Name,
                                            ChildrenAmount = o.TouristGroup.ChildrenAmount,
                                            Status = o.Status,
                                            IsListParticipants = false
                                        }).FirstOrDefault();
                if(order != null)
                {
                    var touristGroup = _context.TouristGroup.Include(t=>t.User)
                        .Include(o => o.ParticipantsList)
                        .ThenInclude(o => o.User).First(t=>t.ID == order.TouristGroupID);
                    foreach (var participant in touristGroup.ParticipantsList)
                    {
                        order.Users.Add(participant.User);
                    }
                }
                    
                return order;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
