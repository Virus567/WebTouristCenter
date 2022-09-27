using TouristСenterLibrary;
using t = TouristСenterLibrary.Entity;
using WebServerAsp.Repositories;

namespace WebServerAsp.Services
{
    public class RouteService : IRouteRepository
    {
        private readonly ApplicationContext _context;
        public RouteService(ApplicationContext context)
        {
            _context = context;
        }


        public t.Route? GetRouteByID(int id)
        {
            return _context.Route.FirstOrDefault(r=>r.ID == id);
        }

        public IQueryable<t.Route> GetRoutes()
        {
            return _context.Route;
        }
    }
}
