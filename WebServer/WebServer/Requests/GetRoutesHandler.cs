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
    [RequestHandlerPath("/routes")]
    public class GetRoutesHandler : RequestHandler
    {
        [Get]
        public void GetRoutes()
        {
            List<Route> routes = Route.GetRouters();

            if (routes == null) {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }
               

            if(Params.TryGetValue("sort", out var sort))
            {
                if(Convert.ToInt32(sort) == 1) 
                {
                    //routes.OrderBy(r => r.Popularity);
                }
                if(Convert.ToInt32(sort) == 2)
                {
                    routes.OrderBy(r => r.Name);
                }
                if(Convert.ToInt32(sort) == 3)
                {
                    routes.OrderBy(r => r.NumberDays);
                }
                
            }

            if(Params.TryGetValue("river", out var river))
            {
               routes = routes.Where(r => r.River == river).ToList();
            }

            if(Params.TryGetValue("search", out var search))
            {
                routes=  routes.Where(r => r.Name.ToLower().Contains(search.ToLower())).ToList();
            }

            if (Params.TryGetValue("days", out var days))
            {
                routes =  routes.Where(r => r.NumberDays == Convert.ToInt32(days)).ToList();
            }

            Send(new AnswerModel(true, new { routes = routes }, null, null));
        }
    }
}
