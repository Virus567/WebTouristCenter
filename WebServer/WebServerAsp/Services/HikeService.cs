using TouristСenterLibrary;
using TouristСenterLibrary.Entity;
using WebServerAsp.Repositories;
using WebServerAsp.Models;
using ExcelLibrary;
using System.Net.Mail;
using System.Net;

namespace WebServerAsp.Services
{
    public class HikeService : IHikeRepository
    {
        public bool AddReport(DatesModel body, User user)
        {
            try
            {
                List<Hike.HikeView> hikes = Hike.GetViewByUserID(user.ID);

                DateTime startdt = DateTime.Parse(body.startDate);
                DateTime finishdt = DateTime.Parse(body.finishDate);
                hikes = hikes.Where(l => DateTime.Parse(l.StartTime) >= startdt && DateTime.Parse(l.StartTime) <= finishdt).ToList();
                string path = Directory.GetCurrentDirectory();
                string filePath = Path.Combine(path, $"Report.xlsx");
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
                msg.Body = "Сформирован отчет по пройденным вами маршрутам с " + startdt.ToString("d") + " по " + finishdt.ToString("d") + ".";
                using (var smtp = new SmtpClient("smtp.mail.ru", 587))
                {
                    smtp.Credentials = new NetworkCredential("tourist-center-vyatsu@mail.ru", "KHJGuMh1AMswAADBP9CL");
                    smtp.EnableSsl = true;
                    smtp.Send(msg);
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
            

            
        }


        public List<HikeModel> GetHikes(int id)
        {
            List<Hike.HikeView> hikes = Hike.GetViewByUserID(id);           
            var hikesModel = new List<HikeModel>();
            foreach (var hike in hikes)
            {
                hikesModel.Add(new HikeModel(hike));
            }
            return hikesModel;

        }
    }
}
