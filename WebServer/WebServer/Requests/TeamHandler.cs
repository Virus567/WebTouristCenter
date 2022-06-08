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
    [RequestHandlerPath("/teams")]
    public class TeamHandler : RequestHandler
    {
        [Get("get")]
        public void GetTeams()
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
            List<Route> routes = Route.GetRouters();

            if (!routes.Any())
            {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }



            Send(new AnswerModel(true, new { routes = routes }, null, null));
        }

        [Post("id")]
        public void GetRoutesByID()
        {
            var id = Bind<int>();
            var route = Route.GetRouteByID(id);
            if (route == null)
            {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }

            Send(new AnswerModel(true, new { route = route }, null, null));
        }
    }
}
