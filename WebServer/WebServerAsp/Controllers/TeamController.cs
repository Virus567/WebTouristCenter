using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TouristСenterLibrary.Entity;
using t = TouristСenterLibrary.Entity;
using WebServerAsp.Models;
using WebServerAsp.Repositories;

namespace WebServerAsp.Controllers
{
    [ApiController]
    [Route("teams")]
    public class TeamController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITeamRepository _teamRepository;

        public TeamController(IUserRepository userRepository, ITeamRepository teamRepository)
        {
            _userRepository = userRepository;
            _teamRepository = teamRepository;
        }
        [HttpGet]
        public IActionResult GetTeams()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var user = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (user is null) return BadRequest("Incorrect user");
            List<Team> teams = _teamRepository.GetTeamsByUserLogin(user.Login);
            List<TeamModel> teamsModel = new List<TeamModel>();
            foreach (var t in teams)
            {
                teamsModel.Add(new TeamModel(t));
            }


            List<Teammate> teammates = new List<Teammate>();

            Team myTeam = teams.FirstOrDefault(t => t.Name == "Моя команда" && t.MainUser == user);
            List<TeammateModel> teammatesModel = new List<TeammateModel>();
            List<TeammateModel> invitesTeammatesModel = new List<TeammateModel>();
            var myTeamModel = new TeamModel(myTeam);
            if (myTeam != null)
            {

                teammates = _teamRepository.GetTeammatesByTeam(myTeam);

                foreach (var teammate in teammates)
                {
                    if (teammate.IsTeammate)
                        teammatesModel.Add(new TeammateModel(teammate));
                    else if (!teammate.IsActive)
                    {
                        invitesTeammatesModel.Add(new TeammateModel(teammate));
                    }
                }
            }

            var allTeams = _teamRepository.GetTeams();
            List<InviteModel> invites = InviteModel.GetInvites(user, allTeams);

            return Ok(new { teams = teamsModel, teammates = teammatesModel, invites = invites, invitesTeammates = invitesTeammatesModel, team = myTeamModel });
        }

        [HttpGet("team-id/{id:int}")]
        public IActionResult GetTeammatesByTeamID(int id)
        {
            if (id != 0)
            {
                var team = _teamRepository.GetTeamsByID(id);
                if (team == null) return BadRequest("Incorrect request");

                var teammates = _teamRepository.GetTeammatesByTeam(team);
                List<TeammateModel> teammatesModel = new List<TeammateModel>();
                foreach (var teammate in teammates)
                {
                    if (teammate.IsTeammate)
                        teammatesModel.Add(new TeammateModel(teammate));
                }
                return Ok( new { teammates = teammatesModel });
            }
            else return BadRequest("Incorrect request");
        }

        [HttpGet("change-team/{id:int}")]
        public IActionResult ChangeTeam(int id)
        {
            if (id != 0)
            {
                var team = _teamRepository.GetTeamsByID(id);
                TeamModel teamModel = new TeamModel(team);
                if (team == null) return BadRequest("Incorrect request");

                var teammates = _teamRepository.GetTeammatesByTeam(team);
                List<TeammateModel> teammatesModel = new List<TeammateModel>();
                List<TeammateModel> invitesTeammatesModel = new List<TeammateModel>();
                foreach (var teammate in teammates)
                {
                    if (teammate.IsTeammate)
                        teammatesModel.Add(new TeammateModel(teammate));
                    else if (!teammate.IsActive)
                    {
                        invitesTeammatesModel.Add(new TeammateModel(teammate));
                    }
                }
                return Ok(new { team = teamModel, teammates = teammatesModel, invitesTeammates = invitesTeammatesModel});
            }
            else return BadRequest("Incorrect request");
        }

        [HttpGet("default-teammates")]
        public IActionResult GetDefaultTeammatesByUser()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var user = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (user is null) return BadRequest("Incorrect user");

            List<Team> teams = _teamRepository.GetTeamsByUserLogin(user.Login);
            var myTeam = teams.FirstOrDefault(t => t.Name == "Моя команда");
            if (myTeam == null) return BadRequest("Incorrect request")
                    ;        

           return Ok(new { team = new TeamModel(myTeam), teammates = _teamRepository.GetTeammatesByTeam(myTeam).Select(t=> new TeammateModel(t)) });
        }

        [HttpGet("find-by-login/{login}")]
        public IActionResult FindUserByLogin(string login)
        {
            if (login!="")
            {
                var user = _userRepository.GetUserByLogin(login);
                if (user == null) return BadRequest("Incorrect request");
                var userModel = new UserModel(user);
                string fullName = user.GetFullName();

                return Ok(new { user = userModel, fullName = fullName });
            }
            else return BadRequest("Incorrect request");
        }

        [HttpGet("find-by-phone/{phone}")]
        public IActionResult FindUserByPhone(string phone )
        {
            if (phone!="")
            {
                var user = _userRepository.GetUserByPhoneNumber(phone);
                if (user == null) return BadRequest("Incorrect request");

                var userModel = new UserModel(user);
                string fullName = user.GetFullName();
                return Ok(new { user = userModel, fullName = fullName });
            }
            else return BadRequest("Incorrect request");
        }

        [HttpPost("change-is-teammate")]
        public IActionResult ChangeInvites(ChangeInvitesModel body)
        {
            if (body.flag == null || body.userId == null) return BadRequest("Incorrect request");
            var mainUser = _userRepository.GetUserByID(body.userId);
            if (mainUser is null) return BadRequest("Incorrect request"); ;

            var teams = _teamRepository.GetTeamsByUserLogin(mainUser.Login);
            Team myTeam = teams.FirstOrDefault(t => t.Name == "Моя команда" && t.MainUser == mainUser);
            if (myTeam == null) return BadRequest("Incorrect request");

            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var user = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (user is null) return BadRequest("Incorrect user");

            foreach (var teammate in myTeam.Teammates)
            {
                if (teammate.User.Login == user.Login && !teammate.IsTeammate && !teammate.IsActive)
                {
                    teammate.IsActive = true;
                    teammate.IsTeammate = body.flag;
                    _teamRepository.UpdateTeammate(teammate);
                }
            }
            teams = _teamRepository.GetTeamsByUserLogin(user.Login);
            var allTeams = _teamRepository.GetTeams();
            var invites = InviteModel.GetInvites(user, allTeams);
            List<TeamModel> teamsModel = new List<TeamModel>();
            foreach (var t in teams)
            {
                teamsModel.Add(new TeamModel(t));
            }

           return Ok(new { invites = invites, teams = teamsModel });
        }

        [HttpPost("kick-teammate")]
        public IActionResult KickTeammate(ChangeInvitesModel body)
        {
            if (body.flag == null || body.userId == null) return BadRequest("Incorrect request");
            var user = _userRepository.GetUserByID(body.userId);
            if (user is null) return BadRequest("Incorrect request");

            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var mainUser = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (mainUser is null) return BadRequest("Incorrect user");

            var teams = _teamRepository.GetTeamsByUserLogin(mainUser.Login);
            Team myTeam = teams.FirstOrDefault(t => t.Name == "Моя команда" && t.MainUser == mainUser);
            if (myTeam == null) return BadRequest("Incorrect request");

            foreach (var teammate in myTeam.Teammates)
            {
                if (teammate.User.Login == user.Login && teammate.IsTeammate && teammate.IsActive)
                {
                    teammate.IsTeammate = body.flag;
                    _teamRepository.UpdateTeammate(teammate);
                }
            }
            List<Teammate> teammates = _teamRepository.GetTeammatesByTeam(myTeam);
            List<TeammateModel> teammatesModel = new List<TeammateModel>();

            foreach (var teammate in teammates)
            {
                if (teammate.IsTeammate)
                    teammatesModel.Add(new TeammateModel(teammate));
            }

           return Ok(new { teammates = teammatesModel });
        }

        [HttpPost("leave-team")]
        public IActionResult LeaveTeam(ChangeInvitesModel body)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var user = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (user is null) return BadRequest("Incorrect user");
 
            if (body.flag == null || body.userId == null) return BadRequest("Incorrect request");

            var mainUser = _userRepository.GetUserByID(body.userId);
            if (mainUser is null) return BadRequest("Incorrect request");

            var teams = _teamRepository.GetTeamsByUserLogin(mainUser.Login);
            Team myTeam = teams.FirstOrDefault(t => t.Name == "Моя команда" && t.MainUser == mainUser);
            if (myTeam == null) return BadRequest("Incorrect request");
            TeamModel myTeamModel = new TeamModel(myTeam);
            foreach (var teammate in myTeam.Teammates)
            {
                if (teammate.User.Login == user.Login && teammate.IsTeammate && teammate.IsActive)
                {
                    teammate.IsTeammate = body.flag;
                    _teamRepository.UpdateTeammate(teammate);
                }
            }
            List<Teammate> teammates = _teamRepository.GetTeammatesByTeam(myTeam);
            List<TeammateModel> teammatesModel = new List<TeammateModel>();
            List<TeammateModel> invitesTeammatesModel = new List<TeammateModel>();
            foreach (var teammate in teammates)
            {
                if (teammate.IsTeammate)
                    teammatesModel.Add(new TeammateModel(teammate));
                else if (!teammate.IsActive)
                {
                    invitesTeammatesModel.Add(new TeammateModel(teammate));
                }
            }

            teams = _teamRepository.GetTeamsByUserLogin(user.Login);
            List<TeamModel> teamsModel = new List<TeamModel>();
            foreach (var t in teams)
            {
                teamsModel.Add(new TeamModel(t));
            }

            return Ok(new { teams = teamsModel, team = myTeamModel, invitesTeammates = invitesTeammatesModel, teammates = teammatesModel, });
        }

        [HttpGet("add-teammate/{phone}/{login}")]
        public IActionResult AddTeammate(string phone= "", string login ="")
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var mainUser = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (mainUser is null) return BadRequest("Incorrect user");
            var team = _teamRepository.GetTeamsByUserLogin(mainUser.Login).FirstOrDefault(x => x.Name == "Моя команда");
            if (team == null) return BadRequest("Incorrect request");

            if (phone != "" && phone != "+7" && phone != "+")
            {
                var user = _userRepository.GetUserByPhoneNumber(phone);
                if (user == null) return BadRequest("Incorrect request");

                if (team.Teammates.Any(x => x.User.Login == user.Login))
                {
                    var teammate = team.Teammates.First(x => x.User.Login == user.Login);
                    if (!teammate.IsTeammate)
                    {
                        teammate.IsTeammate = true;
                        _teamRepository.UpdateTeammate(teammate);
                    }
                }
                else
                {
                    if (!_teamRepository.AddTeammate(user, team)) return BadRequest("Incorrect request");
                }

                var teammates = _teamRepository.GetTeammatesByTeam(team);
                List<TeammateModel> teammatesModel = new List<TeammateModel>();
                List<TeammateModel> invitesTeammatesModel = new List<TeammateModel>();
                foreach (var teammate in teammates)
                {
                    if (teammate.IsTeammate)
                        teammatesModel.Add(new TeammateModel(teammate));
                    else if (!teammate.IsActive)
                    {
                        invitesTeammatesModel.Add(new TeammateModel(teammate));
                    }
                }
               return Ok( new { teammates = teammatesModel, invitesTeammates = invitesTeammatesModel });
            }
            else if (login != "")
            {
                var user = _userRepository.GetUserByLogin(login);
                if (user == null) return BadRequest("Incorrect request");

                if (team.Teammates.Any(x => x.User.Login == user.Login))
                {
                    var teammate = team.Teammates.First(x => x.User.Login == user.Login);
                    if (!teammate.IsTeammate)
                    {
                        teammate.IsTeammate = true;
                        _teamRepository.UpdateTeammate(teammate);
                    }
                }
                else if (!_teamRepository.AddTeammate(user,team)) return BadRequest("Incorrect request");

                var teammates = _teamRepository.GetTeammatesByTeam(team);
                List<TeammateModel> teammatesModel = new List<TeammateModel>();
                List<TeammateModel> invitesTeammatesModel = new List<TeammateModel>();
                foreach (var teammate in teammates)
                {
                    if (teammate.IsTeammate)
                        teammatesModel.Add(new TeammateModel(teammate));
                    else if (!teammate.IsActive)
                    {
                        invitesTeammatesModel.Add(new TeammateModel(teammate));
                    }
                }

                return Ok(new { teammates = teammatesModel, invitesTeammates = invitesTeammatesModel });
            }
            else return BadRequest("Incorrect request");
        }
    }
}
