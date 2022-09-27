using t = TouristСenterLibrary.Entity;

namespace WebServerAsp.Repositories
{
    public interface IRouteRepository
    {

        public IQueryable<t.Route> GetRoutes();

        public t.Route? GetRouteByID(int id);
    }
}
