using TouristСenterLibrary;
using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Converters;

public class HikeConverter
{
    private readonly ApplicationContext _context;

    public HikeConverter(ApplicationContext context)
    {
        _context = context;
    }

    public HikeModel GetHikeModel(Hike hike)
    {
        
        var hikeModel = _context.Hike.AsQueryable().Select(s => new HikeModel()
        {
            ID = hike.ID,
            StartTime = s.OrdersList[0].StartTime.ToString("yyyy-MM-dd"),
            FinishTime = s.OrdersList[0].FinishTime.ToString("yyyy-MM-dd"),
            RouteName = s.Route.Name,
            WayToTravel = s.OrdersList[0].WayToTravel,
            CompanyName = s.OrdersList[0].TouristGroup.GetCompanyNameForHike(),
            PeopleAmount = s.OrdersList.Sum(t=>t.TouristGroup.PeopleAmount),
            Status = hike.Status,
            IsPhotograph = s.OrdersList.Any(t=>t.IsPhotograph),
            OrdersList = s.OrdersList.Select(o=> new OrderModel()
            {
                ID = o.ID,
                StartTime = o.StartTime.ToString("yyyy-MM-dd"),
                FinishTime = o.FinishTime.ToString("yyyy-MM-dd"),
                RouteName = o.Route.Name,
                WayToTravel = o.WayToTravel,
                TouristGroup = o.TouristGroup.GetCompanyNameForOrder(),
                PeopleAmount = o.TouristGroup.PeopleAmount,
                ChildrenAmount = o.TouristGroup.ChildrenAmount,
                ApplicationTypeName = o.ApplicationType.Name,
                Status = o.Status,
                IsListParticipants = false,
                IsPhotograph = o.IsPhotograph,
                Users = o.TouristGroup.ParticipantsList.Select(p=> new UserModel()
                {
                    ID = p.User.ID,
                    Login = p.User.Login,
                    Surname = p.User.Surname,
                    Name = p.User.Name,
                    MiddleName = p.User.Middlename,
                }).ToList()
            }).ToList(),
        }).First();
        return hikeModel;
    }
}