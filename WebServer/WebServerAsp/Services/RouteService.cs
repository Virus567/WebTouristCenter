using TouristСenterLibrary;
using t = TouristСenterLibrary.Entity;
using WebServerAsp.Repositories;
using Microsoft.EntityFrameworkCore;

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
            return _context.Route.Include(r => r.CheckpointStart).Include(r => r.CheckpointFinish).FirstOrDefault(r=>r.ID == id);
        }

        public IQueryable<t.Route> GetRoutes()
        {
            return _context.Route;
        }
    }
}
