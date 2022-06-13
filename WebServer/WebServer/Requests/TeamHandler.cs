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
            List<TeamModel> teamsModel = new List<TeamModel>();
            foreach (var t in teams)
            {
               teamsModel.Add(new TeamModel(t));
            }


            List<Teammate> teammates = new List<Teammate>();

            Team myTeam = teams.FirstOrDefault(t => t.Name == "Моя команда");  
            List<TeammateModel> teammatesModel = new List<TeammateModel>();
            List<TeammateModel> invitesTeammatesModel = new List<TeammateModel>();
            var myTeamModel = new TeamModel(myTeam);
            if (myTeam != null)
            {
                
                teammates = Teammate.GetTeammatesByTeam(myTeam);
                
                foreach (var teammate in teammates)
                {
                    if(teammate.IsTeammate)
                        teammatesModel.Add(new TeammateModel(teammate));
                    else if (!teammate.IsActive)
                    {
                        invitesTeammatesModel.Add(new TeammateModel(teammate));
                    }
                }
            }
            

            List<InviteModel> invites = InviteModel.GetInvites(user);



            Send(new AnswerModel(true, new {teams = teamsModel, teammates = teammatesModel, invites = invites, invitesTeammates = invitesTeammatesModel, team = myTeamModel }, null, null));
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
                List<TeammateModel> teammatesModel = new List<TeammateModel>();
                foreach (var teammate in teammates)
                {
                    teammatesModel.Add(new TeammateModel(teammate));
                }
                Send(new AnswerModel(true, new { teammates = teammatesModel }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            
        }

        [Get("change-team")]
        public void ChangeTeam()
        {
            if (Params.TryGetValue("id", out var id))
            {
                var team = Team.GetTeamsByID(int.Parse(id));
                TeamModel teamModel = new TeamModel(team);
                if (team == null)
                {
                    Send(new AnswerModel(false, null, 400, "incorrect request"));
                    return;
                }
                var teammates = Teammate.GetTeammatesByTeam(team);
                List<TeammateModel> teammatesModel = new List<TeammateModel>();
                foreach (var teammate in teammates)
                {
                    teammatesModel.Add(new TeammateModel(teammate));
                }

                Send(new AnswerModel(true, new {team = teamModel, teammates = teammatesModel }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }


        }


        [Get("default-teammates")]
        public void GetDefaultTeammatesByUser()
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
            List<TeamModel> teamsModel = new List<TeamModel>();
            foreach (var t in teams)
            {
                teamsModel.Add(new TeamModel(t));
            }

            var myTeam = teams.FirstOrDefault(t => t.Name == "Моя команда");
            if (myTeam == null)
            {
                Send(new AnswerModel(false, null, 401, "incorrect request"));
                return;
            }
            TeamModel myTeamModel = new TeamModel(myTeam);
            List<Teammate> teammates = Teammate.GetTeammatesByTeam(myTeam);
            List<TeammateModel> teammatesModel = new List<TeammateModel>();

            foreach (var teammate in teammates)
            {
                teammatesModel.Add(new TeammateModel(teammate));
            }

            Send(new AnswerModel(true, new {team = myTeamModel,  teammates = teammatesModel }, null, null));
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
                var userModel = new UserModel(user);
                string fullName = user.GetFullName();
               Send(new AnswerModel(true, new { user = userModel, fullName = fullName }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
        }

        [Get("find-by-phone")]
        public void FindUserByPhone()
        {
            if (Params.TryGetValue("phone", out var phone))
            {
                var user = User.GetUserByPhoneNumber(phone);
                if (user == null)
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }
                var userModel = new UserModel(user);
                string fullName = user.GetFullName();
                Send(new AnswerModel(true, new { user = userModel, fullName = fullName }, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
        }

        [Post("add-teammate")]
        public void AddTeammate()
        {
            if (!Headers.TryGetValue("Access-Token", out var token) || !TokenWorker.CheckToken(token))
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
            var mainUser = TokenWorker.GetUserByToken(token);
            if (mainUser is null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
            var team = Team.GetTeamsByUserLogin(mainUser.Login).FirstOrDefault(x => x.Name == "Моя команда"); 
            if (team == null)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            if (Params.TryGetValue("phone", out var phone) && phone!="")
            {
                var user = User.GetUserByPhoneNumber(phone);
                if (user == null)
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }

                if (!team.AddTeammate(user))
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }
                var teammates = Teammate.GetTeammatesByTeam(team);
                List<TeammateModel> teammatesModel = new List<TeammateModel>();
                foreach(var teammate in teammates)
                {
                    teammatesModel.Add(new TeammateModel(teammate));
                }
                Send(new AnswerModel(true, new { teammates = teammatesModel }, null, null));
            }
            else if (Params.TryGetValue("login", out var login) && login != "")
            {
                var user = User.GetUserByLogin(login);
                if (user == null)
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }

                if (!team.AddTeammate(user))
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }
                var teammates = Teammate.GetTeammatesByTeam(team);
                List<TeammateModel> teammatesModel = new List<TeammateModel>();
                foreach (var teammate in teammates)
                {
                    teammatesModel.Add(new TeammateModel(teammate));
                }

                Send(new AnswerModel(true, new {teammates = teammatesModel}, null, null));
            }
            else
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
        }
            

    }
}
