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
    [RequestHandlerPath("/orders")]
    public class GetOrderHandler : RequestHandler
    {

        [Post("get")]
        public void GetOrders()
        {
            var id = Bind<int>();
            List<Order.OrderView> orders = Order.GetViewByUserId(id);

            if (!orders.Any())
            {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }

            Send(new AnswerModel(true, new { orders = orders }, null, null));
        }
    }
}