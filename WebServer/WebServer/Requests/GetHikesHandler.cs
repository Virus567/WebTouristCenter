using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        [Post("get")]
        public void GetHikes()
        {
            var id = Bind<int>();
            List<Hike.HikeView> hikes = Hike.GetViewByUserID(id);

            if (!hikes.Any())
            {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }


            if (Params.TryGetValue("date", out var date))
            {
                hikes = hikes.Where(h => h.StartTime == date).ToList();
            }

            if (Params.TryGetValue("route", out var route))
            {
                hikes = hikes.Where(h => h.RouteName == route).ToList();
            }

            if (Params.TryGetValue("status", out var status))
            {
                hikes = hikes.Where(h => h.Status == status).ToList();
            }

            Send(new AnswerModel(true, new { hikes = hikes }, null, null));
        }
    }
}
