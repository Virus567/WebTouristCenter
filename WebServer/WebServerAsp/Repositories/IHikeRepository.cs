using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Repositories
{
    public interface IHikeRepository
    {
        public List<HikeModel> GetHikes(int userId);

        public bool AddReport(DatesModel dates, User user);
        public List<Hike.HikeView> GetViewByUserID(int userId);
        public Hike.HikeView? GetViewByID(int hikeId);
    }
}
