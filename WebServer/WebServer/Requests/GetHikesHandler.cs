using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using ExcelLibrary;
using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using TouristСenterLibrary.Entity;
using Trivial.Security;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/hikes")]
    public class GetHikesHandler : RequestHandler
    {

        [Get("get")]
        public void GetHikes()
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
            List<Hike.HikeView> hikes = Hike.GetViewByUserID(user.ID);
            List<Order.OrderView> orders = Order.GetViewByUserId(user.ID);
            var hikesModel = new List<HikeModel>();
            var ordersModel = new List<OrderModel>();
            foreach(var order in orders)
            {
                ordersModel.Add(new OrderModel(order));
            }
            foreach (var hike in hikes)
            {
                hikesModel.Add(new HikeModel(hike));
            }



            Send(new AnswerModel(true, new { hikes = hikesModel, orders = ordersModel }, null, null));
        }

        [Get("get-with-params")]
        public void GetHikesWithParams()
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

            List<Hike.HikeView> hikes = Hike.GetViewByUserID(user.ID);
            if (Params.TryGetValue("date", out var date) && date != "")
            {
               hikes = hikes.Where(h=>h.StartTime == DateTime.Parse(date).ToString("d")).ToList();
            }

            if (Params.TryGetValue("route", out var route) && route != "")
            {
                hikes = hikes.Where(h=>h.RouteName == HttpUtility.UrlDecode(route)).ToList();
            }

            if (Params.TryGetValue("status", out var status) && status != "")
            {
                hikes = hikes.Where(h => h.Status == HttpUtility.UrlDecode(status)).ToList();
            }

            var hikesModel = new List<HikeModel>();
            foreach (var hike in hikes)
            {
                hikesModel.Add(new HikeModel(hike));
            }


            Send(new AnswerModel(true, new { hikes = hikesModel}, null, null));
        }

        [Post("add-report")]
        public void AddReport()
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

            List<Hike.HikeView> hikes = Hike.GetViewByUserID(user.ID);
            var body = Bind<DatesModel>();
            if (body == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
            if (body.startDate == null || body.finishDate == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            DateTime startdt = DateTime.Parse(body.startDate);
            DateTime finishdt = DateTime.Parse(body.finishDate);
            hikes = hikes.Where(l => DateTime.Parse(l.StartTime) >= startdt && DateTime.Parse(l.StartTime) <= finishdt).ToList();
            string path = Directory.GetCurrentDirectory();
            string filePath = Path.Combine(path,$"Report.xlsx");
            using (var excel = new ExcelHelper())
            {
                try
                {
                     
                    if (excel.Open(filePath))
                    {
                        excel.SetHikes(hikes);
                        excel.Save();
                        excel.Dispose();
                    }
                }
                catch (Exception ex) { }
            }

            var from = new MailAddress("tourist-center-vyatsu@mail.ru", "Администрация туристического центра");
            var to = new MailAddress(user.Email, "Пользователь");
            var msg = new MailMessage(from, to);
            msg.Subject = "Отчет по походам";
            msg.Attachments.Add(
                new Attachment(filePath));
            msg.Body = "Сформирован отчет по пройденным вами маршрутам с " +startdt.ToString("d")+" по " + finishdt.ToString("d")+".";
            using (var smtp = new SmtpClient("smtp.mail.ru", 587))
            {
                smtp.Credentials = new NetworkCredential("tourist-center-vyatsu@mail.ru", "KHJGuMh1AMswAADBP9CL");
                smtp.EnableSsl = true;
                smtp.Send(msg);
            }

            Send(new AnswerModel(true, null, null, null));
        }
    }
}
