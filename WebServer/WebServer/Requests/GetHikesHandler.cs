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

            Send(new AnswerModel(true, new { hikes = hikesModel, orders = ordersModel }, null, null));
        }
    }
}
