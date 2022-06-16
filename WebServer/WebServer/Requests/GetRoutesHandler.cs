using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using TouristСenterLibrary.Entity;
using Trivial.Security;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/routes")]
    public class GetRoutesHandler : RequestHandler
    {
        public List<Route> mainRoutes = new List<Route>();

        [Get("get")]
        public void GetRoutes()
        {
            List<Route> routes = Route.GetRouters();

            if (!routes.Any()) {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }
            mainRoutes = routes;

            Send(new AnswerModel(true, new { routes = routes.OrderByDescending(r => r.Popularity).ToList() }, null, null));
        }

        [Get("get-with-params")]
        public void GetRoutesWithParams()
        {
            if (!mainRoutes.Any())
            {
                List<Route> routes = Route.GetRouters();
                if (!routes.Any())
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request body"));
                    return;
                }
                mainRoutes = routes;
            }

            var tmpRoutes = mainRoutes;

            if (Params.TryGetValue("sort", out var sort) && sort != "")
            {
                if (Convert.ToInt32(sort) == 1)
                {
                    tmpRoutes = tmpRoutes.OrderByDescending(r => r.Popularity).ToList();
                }
                if (Convert.ToInt32(sort) == 2)
                {
                    tmpRoutes = tmpRoutes.OrderBy(r => r.Name).ToList();
                }
                if (Convert.ToInt32(sort) == 3)
                {
                    tmpRoutes = tmpRoutes.OrderBy(r => r.NumberDays).ToList();
                }

            }

            if (Params.TryGetValue("river", out var river) && river!="" && river!="All")
            {
                tmpRoutes = tmpRoutes.Where(r => r.River == river).ToList();
            }

            if (Params.TryGetValue("search", out var search) && search!="")
            {
                tmpRoutes = tmpRoutes.Where(r => r.Name.ToLower().Contains(HttpUtility.UrlDecode(search).ToLower())).ToList();
            }

            if (Params.TryGetValue("days", out var days) && days!="" && days!="0")
            {
                tmpRoutes = tmpRoutes.Where(r => r.NumberDays == Convert.ToInt32(days)).ToList();
            }

            Send(new AnswerModel(true, new { routes = tmpRoutes }, null, null));

        }

        [Get("id")]
        public void GetRoutesByID()
        {
            if (Params.TryGetValue("id", out var id))
            {
                var route = Route.GetRouteByID(Convert.ToInt32(id));
                if (route == null)
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }
                Send(new AnswerModel(true, new { route = route }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 401, "incorrect request"));
                return;
            }

            
        }
    }
}
