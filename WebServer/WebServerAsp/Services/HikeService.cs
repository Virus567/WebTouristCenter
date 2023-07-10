using TouristСenterLibrary;
using TouristСenterLibrary.Entity;
using WebServerAsp.Repositories;
using WebServerAsp.Models;
using ExcelLibrary;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace WebServerAsp.Services
{
    public class HikeService : IHikeRepository
    {
        private readonly ApplicationContext _context;

        public HikeService(ApplicationContext context)
        {
            _context = context;
        }
        public bool AddReport(DatesModel body, User user)
        {
            try
            {
                List<Hike.HikeView> hikes = _context.Hike.Include(h=>h.OrdersList)
                    .ThenInclude(h => h.TouristGroup)
                    .ThenInclude(h => h.User )
                    .Include(h => h.OrdersList)
                    .ThenInclude(h => h.TouristGroup)
                    .ThenInclude(h => h.ParticipantsList) 
                    .ThenInclude(h=>h.User)
                    .Select(h => new Hike.HikeView()
                    {
                        ID = h.ID,
                        OrdersList = h.OrdersList,
                        RouteName = h.Route.Name,
                        WayToTravel = h.OrdersList.FirstOrDefault().WayToTravel,
                        CompanyName = h.OrdersList.FirstOrDefault().TouristGroup.GetCompanyNameForHike(),
                        StartTime = h.OrdersList.FirstOrDefault().StartTime.ToString("d"),
                        FinishTime = h.OrdersList.FirstOrDefault().FinishTime.ToString("d"),
                        Status = h.Status
                    }).ToList();

                foreach (Hike.HikeView hike in hikes)
                {
                    hike.PeopleAmount = 0;
                    foreach (var order in hike.OrdersList)
                    {
                        hike.PeopleAmount += order.TouristGroup.PeopleAmount;
                        hike.Users.Add(order.TouristGroup.User);
                        foreach (var participant in order.TouristGroup.ParticipantsList)
                        {
                            var p = participant;
                            p.TouristGroup = null;
                            hike.Users.Add(p.User);
                        }
                    }
                }
                hikes = hikes.Where(h => h.Users.Contains(_context.User.First(u => u.ID == user.ID))).ToList();

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
                    smtp.Credentials = new NetworkCredential("tourist-center-vyatsu@mail.ru", "PgbQ8YpGhzZzuWMJkU4p");
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

        public List<Hike.HikeView> GetViewByUserID(int userId)
        {
            try
            {
                var hikeList = _context.Hike.Include(h=>h.OrdersList)
                            .ThenInclude(h => h.TouristGroup)
                            .ThenInclude(h => h.User )
                            .Include(h => h.OrdersList)
                            .ThenInclude(h => h.TouristGroup)
                            .ThenInclude(h => h.ParticipantsList) 
                            .ThenInclude(h=>h.User)
                            .Select(h => new Hike.HikeView()
                        {
                            ID = h.ID,
                            OrdersList = h.OrdersList,
                            RouteName = h.Route.Name,
                            WayToTravel = h.OrdersList.FirstOrDefault().WayToTravel,
                            CompanyName = h.OrdersList.FirstOrDefault().TouristGroup.GetCompanyNameForHike(),
                            StartTime = h.OrdersList.FirstOrDefault().StartTime.ToString("d"),
                            FinishTime = h.OrdersList.FirstOrDefault().FinishTime.ToString("d"),
                            Status = h.Status
                        }).ToList();

                        foreach (Hike.HikeView hike in hikeList)
                        {
                            hike.PeopleAmount = 0;
                            foreach (var order in hike.OrdersList)
                            {
                                hike.PeopleAmount += order.TouristGroup.PeopleAmount;
                                hike.Users.Add(order.TouristGroup.User);
                                foreach (var participant in order.TouristGroup.ParticipantsList)
                                {
                                    var p = participant;
                                    p.TouristGroup = null;
                                    hike.Users.Add(p.User);
                                }
                            }
                        }
                        hikeList = hikeList.Where(h => h.Users.Any(u=>u.ID == userId)).ToList();
                        return hikeList;
            }
            catch (Exception ex)
            {
                return new List<Hike.HikeView>();
            }
        }

        public Hike.HikeView? GetViewByID(int hikeId)
        {
            try
            {
                var hike = _context.Hike.Include(h => h.OrdersList)
                    .ThenInclude(h => h.TouristGroup)
                    .ThenInclude(h => h.User)
                    .Include(h => h.OrdersList)
                    .ThenInclude(h => h.TouristGroup)
                    .ThenInclude(h => h.ParticipantsList)
                    .ThenInclude(h=>h.User)
                    .Where(h=>h.ID == hikeId)
                    .Select(h => new Hike.HikeView()
                    {
                        ID = h.ID,
                        OrdersList = h.OrdersList,
                        RouteName = h.Route.Name,
                        WayToTravel = h.OrdersList.FirstOrDefault().WayToTravel,
                        CompanyName = h.OrdersList.FirstOrDefault().TouristGroup.GetCompanyNameForHike(),
                        StartTime = h.OrdersList.FirstOrDefault().StartTime.ToString("d"),
                        FinishTime = h.OrdersList.FirstOrDefault().FinishTime.ToString("d"),
                        Status = h.Status
                    }).FirstOrDefault();
                if (hike != null)
                {
                    hike.PeopleAmount = 0;
                    foreach (var order in hike.OrdersList)
                    {
                        hike.PeopleAmount += order.TouristGroup.PeopleAmount;
                        foreach (var participant in order.TouristGroup.ParticipantsList)
                        {
                            participant.TouristGroup = null;
                            hike.Users.Add(participant.User);
                        }
                    }
                }            
                return hike;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<HikeModel> GetHikes(int id)
        {
            List<Hike.HikeView> hikes =_context.Hike.Include(h=>h.OrdersList)
                .ThenInclude(h => h.TouristGroup)
                .ThenInclude(h => h.User )
                .Include(h => h.OrdersList)
                .ThenInclude(h => h.TouristGroup)
                .ThenInclude(h => h.ParticipantsList) 
                .ThenInclude(h=>h.User)
                .Select(h => new Hike.HikeView()
                {
                    ID = h.ID,
                    OrdersList = h.OrdersList,
                    RouteName = h.Route.Name,
                    WayToTravel = h.OrdersList.FirstOrDefault().WayToTravel,
                    CompanyName = h.OrdersList.FirstOrDefault().TouristGroup.GetCompanyNameForHike(),
                    StartTime = h.OrdersList.FirstOrDefault().StartTime.ToString("d"),
                    FinishTime = h.OrdersList.FirstOrDefault().FinishTime.ToString("d"),
                    Status = h.Status
                }).ToList();

            foreach (Hike.HikeView hike in hikes)
            {
                hike.PeopleAmount = 0;
                foreach (var order in hike.OrdersList)
                {
                    hike.PeopleAmount += order.TouristGroup.PeopleAmount;
                    hike.Users.Add(order.TouristGroup.User);
                    foreach (var participant in order.TouristGroup.ParticipantsList)
                    {
                        var p = participant;
                        p.TouristGroup = null;
                        hike.Users.Add(p.User);
                    }
                }
            }
            hikes = hikes.Where(h => h.Users.Contains(_context.User.First(u => u.ID == id))).ToList();;           
            var hikesModel = new List<HikeModel>();
            foreach (var hike in hikes)
            {
                hikesModel.Add(new HikeModel(hike));
            }
            return hikesModel;

        }
    }
}
