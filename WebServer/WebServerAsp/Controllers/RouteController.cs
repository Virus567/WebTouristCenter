using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using WebServerAsp.Repositories;
namespace WebServerAsp.Controllers
{
    [ApiController]
    [Route("routes")]
    public class RouteController: ControllerBase
    {
        private readonly IRouteRepository _routeRepository;

        public RouteController(IRouteRepository routeRepository)
        {
            _routeRepository = routeRepository;
        }

        [HttpGet]
        public IActionResult GetRoutes(int sort = 1, string? river = "", string? search = "", int days = 0)
        {
            var routes = _routeRepository.GetRoutes().ToList();
            //if (sort == 1)
            //{
            //   routes = routes.OrderByDescending(r => r.Popularity);
            //}
            //if (sort == 2)
            //{
            //    routes = routes.OrderBy(r => r.Name);
            //}
            //if (Convert.ToInt32(sort) == 3)
            //{
            //    routes = routes.OrderBy(r => r.NumberDays);
            //}
            //if (river is not null) routes = routes.Where(r => r.River == river);

            //if (search is not null) routes = routes.Where(r => r.Name.ToLower().Contains(search.ToLower()));

            //if ( days != 0)
            //{
            //    routes = routes.Where(r => r.NumberDays == days);
            //}

            return Ok(routes);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetRoutesByID(int id)
        {
            var route = _routeRepository.GetRouteByID(id);
            
            return route is null ? NotFound(): Ok(new { route = route });
        }
    }
}
