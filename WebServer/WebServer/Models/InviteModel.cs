using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouristСenterLibrary.Entity;

namespace WebServer.Models;

public class InviteModel
{
    public User MainUser { get; set; }
    public User User { get; set; }

    public InviteModel(User MainUser, User User)
    {
        this.MainUser = MainUser;
        this.User = User;
    }

    public static List<InviteModel> GetInvites(User user)
    {
        List<Team> tmpTeams = Team.GetTeams();
        List<InviteModel> invites = new List<InviteModel>();
        foreach (var team in tmpTeams)
        {
            foreach (var teammate in team.Teammates)
            {
                if (teammate.User.Login != user.Login) break;
                if (!teammate.IsTeammate && !teammate.IsActive)
                {
                    var invite = new InviteModel(team.MainUser, user);
                    invites.Add(invite);
                }   
            }
        }
        return invites;
    }
}
