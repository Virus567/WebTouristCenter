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
        public IActionResult GetRoutes(int sort = 1, string? river = null, string? search = "", int days = 0)
        {
            var routes = _routeRepository.GetRoutes().ToList();
            if (sort == 1)
            {
                routes = routes.OrderByDescending(r => r.Popularity).ToList();
            }
            if (sort == 2)
            {
                routes = routes.OrderBy(r => r.Name).ToList();
            }
            if (sort == 3)
            {
                routes = routes.OrderBy(r => r.NumberDays).ToList();
            }
            if (river is not null) routes = routes.Where(r => r.River == river).ToList();

            if (search is not null) routes = routes.Where(r => r.Name.ToLower().Contains(search.ToLower())).ToList();

            if (days != 0)
            {
                routes = routes.Where(r => r.NumberDays == days).ToList();
            }

            return Ok(routes);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetRoutesByID(int id)
        {
            var route = _routeRepository.GetRouteByID(id);
            
            return route is null ? NotFound(): Ok( route );
        }
    }
}
