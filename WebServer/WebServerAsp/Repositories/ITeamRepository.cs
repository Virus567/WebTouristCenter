using TouristСenterLibrary.Entity;

namespace WebServerAsp.Repositories;

public interface ITeamRepository
{

    public List<Team> GetTeamsByUserLogin(string login);
    public List<Teammate> GetTeammatesByTeam(Team team);
    public Team? GetTeamsByID(int id);
    public bool UpdateTeammate(Teammate teammate);
    public bool AddTeammate(User user, Team team);
}