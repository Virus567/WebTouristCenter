using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using TouristСenterLibrary.Entity;
using Trivial.Security;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/teams")]
    public class TeamHandler : RequestHandler
    {
        [Get("get")]
        public void GetTeams()
        {
            if (!Headers.TryGetValue("Access-Token", out var token) || !TokenWorker.CheckToken(token))
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
            var user = TokenWorker.GetUserByToken(token);
            if (user is null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            List<Team> teams = Team.GetTeamsByUserLogin(user.Login);
            List<Teammate> teammates = new List<Teammate>();

            var myTeam = teams.FirstOrDefault(t => t.Name == "Моя команда");

            if(myTeam != null)
            {
                teammates = Teammate.GetTeammatesByTeam(myTeam);
            }

            List<InviteModel> invites = InviteModel.GetInvites(user);



            Send(new AnswerModel(true, new {teams = teams, teammates = teammates, invites = invites}, null, null));
        }

        [Get("team-id")]
        public void GetTeammatesByTeamID()
        {
            if (Params.TryGetValue("id", out var id))
            {
                var team = Team.GetTeamsByID(int.Parse(id));
                if(team == null)
                {
                    Send(new AnswerModel(false, null, 400, "incorrect request"));
                    return;
                }

                var teammates = Teammate.GetTeammatesByTeam(team);
                Send(new AnswerModel(true, new { teammates = teammates }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            
        }

        [Get("find-by-login")]
        public void FindUserByLogin()
        {
            if (Params.TryGetValue("login", out var login))
            {
                var user = User.GetUserByLogin(login);
                if (user == null)
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }

               string fullName = user.GetFullName();
               Send(new AnswerModel(true, new { user = user, fullName = fullName }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
        }
    }
}
