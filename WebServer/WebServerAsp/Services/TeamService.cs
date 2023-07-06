using Microsoft.EntityFrameworkCore;
using TouristСenterLibrary;
using TouristСenterLibrary.Entity;
using WebServerAsp.Repositories;

namespace WebServerAsp.Services;

public class TeamService:ITeamRepository
{
    private readonly ApplicationContext _context;

    public TeamService(ApplicationContext context)
    {
        _context = context;
    }
    
    public List<Team> GetTeamsByUserLogin(string login)
    {
        try
        {
            return _context.Team.Include(t => t.MainUser).Include(t => t.Teammates).ThenInclude(t => t.User).Where(t => t.MainUser.Login == login || t.Teammates.Any(x=>x.User.Login == login && x.IsActive && x.IsTeammate)).ToList();
        }
        catch(Exception ex)
        {
            return new List<Team>();
        }
    }

    public List<Teammate> GetTeammatesByTeam(Team team)
    {
        try
        {
            return _context.Teammate.Include(t=>t.User).Where(t => t.Team == team).ToList();
        }
        catch(Exception ex)
        {
            return new List<Teammate>();
        }
    }

    public Team? GetTeamsByID(int id)
    {
        return _context.Team.Include(t => t.MainUser).Include(t => t.Teammates).ThenInclude(t => t.User).FirstOrDefault(t => t.ID == id);

    }

    public bool UpdateTeammate(Teammate teammate)
    {
        try
        {
            _context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
    public bool AddTeammate(User user, Team team)
    {
        try
        {
            team.Teammates.Add(new Teammate(team, user));
            _context.SaveChanges();
            return true;
        }
        catch(Exception ex)
        {
            return false;
        }
           
    }
}