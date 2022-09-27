using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Repositories
{
    public interface IHikeRepository
    {
        public List<HikeModel> GetHikes(int userId);

        public bool AddReport(DatesModel dates, User user);
    }
}
