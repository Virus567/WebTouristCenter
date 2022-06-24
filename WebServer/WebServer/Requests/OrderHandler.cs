using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using TouristСenterLibrary.Entity;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/orders")]
    public class OrderHandler : RequestHandler
    {

        [Post("add-order")]
        [ResponseTimeout(9000)]
        public void AddOrder()
        {
            if (!Headers.TryGetValue("Access-Token", out var token) || !TokenWorker.CheckToken(token))
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            var user = TokenWorker.GetUserByToken(token);
            if (user is null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            var body = Bind<NewOrderModel>();
            if(body is null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
            if (!NewOrderModel.Check(body))
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

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
            var route = Route.GetRouteByID(body.route.ID);
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



            Send(new AnswerModel(true, new { email = user.Email }, null, null));
        }

        [Get("get-full-info")]
        public void GetOrderFullInfo()
        {
            if (Params.TryGetValue("id", out var id))
            {
                var order = Order.GetViewById(Convert.ToInt32(id));
                if (order == null)
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }
                var route = Route.GetRouteByRouteName(order.RouteName);

                var orderModel = new OrderModel(order);
                Send(new AnswerModel(true, new { route = route, order = orderModel }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 401, "incorrect request"));
                return;
            }
        }

    }
}
