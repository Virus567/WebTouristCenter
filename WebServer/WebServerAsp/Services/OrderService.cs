using System.Net.Mail;
using TouristСenterLibrary.Entity;
using t = TouristСenterLibrary.Entity;
using WebServerAsp.Models;
using WebServerAsp.Repositories;
using System.Net;

namespace WebServerAsp.Services
{
    public class OrderService : IOrderRepository
    {
        public bool AddOrder(NewOrderModel body,User user)
        {
            try
            {
                var touristGroup = new TouristGroup(user, body.peopleAmount, body.childrenAmount);
                if (body.teammates != null)
                {
                    foreach (var teammate in body.teammates)
                    {
                        touristGroup.ParticipantsList.Add(new Participant(User.GetUserByID(teammate.User.ID)));
                    }
                }

                if (body.participants != null)
                {
                    foreach (var participant in body.participants)
                    {
                        if (User.IsHasUser(participant.phone))
                        {
                            touristGroup.ParticipantsList.Add(new Participant(User.GetUserByPhoneNumber(participant.phone)));
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
                    applicationType = ApplicationType.GetTeamType();
                }
                else
                {
                    applicationType = ApplicationType.GetFamilyType();
                }

                var employee = Employee.GetEmployeeById(1);
                var route = t.Route.GetRouteByID(body.route.ID);
                Instructor instructor = null;
                if (body.instructor != null)
                {
                    instructor = Instructor.GetInstructorByID(body.instructor.ID);
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
                    StartTime = DateTime.Parse(body.dateStart),
                    FinishTime = DateTime.Parse(body.dateFinish),
                    Status = "Активна",
                    HermeticBagAmount = body.hermeticBag,
                    IndividualTentAmount = body.personalTent,
                    Instructor = instructor,
                    IsPhotograph = body.isPhotograph
                };

                Order.Add(order);

                route.Popularity += 1;
                route.Update();

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
                    smtp.Credentials = new NetworkCredential("tourist-center-vyatsu@mail.ru", "KHJGuMh1AMswAADBP9CL");
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
            List<Order.OrderView> orders = Order.GetViewByUserId(userId);
            var ordersModel = new List<OrderModel>();
            foreach (var order in orders)
            {
                ordersModel.Add(new OrderModel(order));
            }
            return ordersModel;
        }
    }
}
