using TouristСenterLibrary;
using TouristСenterLibrary.Entity;
using WebServerAsp.Models;
using WebServerAsp.Repositories;

namespace WebServerAsp.Services
{
    public class UserService : IUserRepository
    {
        private readonly ApplicationContext _context;
        public UserService(ApplicationContext context)
        {
            _context = context;
        }

        public User? GetUserAuth(string login, string password)
        {
           return _context.User.FirstOrDefault(x => x.Login == login && x.Password == password);
        }

        public User? GetUserByID(int id)
        {
           return _context.User.FirstOrDefault(u=>u.ID == id);
        }

        public User? GetUserByLogin(string login)
        {
            return _context.User.FirstOrDefault(u => u.Login == login);
        }

        public bool RegisterUser(RegModel body)
        {
            User user;
            if (!User.IsHasUser(body.phone))
            {
                user = new User(body!.surname, body.name, body.phone)
                {
                    NameOfCompany = body.nameOfCompany == "" ? null : body.nameOfCompany,
                    Middlename = body.middlename == "" ? null : body.middlename,
                    Email = body.email == "" ? null : body.email,
                    Login = body.login,
                    Password = body.password
                };
                var team = new Team("Моя команда", user);

                if (!user.Add() || !team.Add())
                {
                    
                    return false;
                }

                if (user.NameOfCompany == null)
                {
                    var aloneTeam = new Team("Пойти в одиночку", user);
                    var aloneTeammate = new Teammate(aloneTeam, user) { IsActive = true, IsTeammate = true };
                    if (!aloneTeam.Add() || !aloneTeammate.Add())
                    {                     
                        return false;
                    }
                }
            }
            else
            {
                user = User.GetUserByPhoneNumber(body.phone);
                if (user.Login == null)
                {
                    user.Login = body.login;
                    user.Password = body.password;
                    user.Email = body.email;
                    var team = new Team("Моя команда", user);
                    if (!user.Update() || !team.Add())
                    {
                        return false;
                    }
                    if (user.NameOfCompany == null)
                    {
                        var aloneTeam = new Team("Пойти в одиночку", user);
                        var aloneTeammate = new Teammate(aloneTeam, user) { IsActive = true, IsTeammate = true };
                        if(!aloneTeam.Add() || !aloneTeammate.Add())
                        {
                            return false;
                        }           
                    }
                }
            }
            return true;
        }
    }
}
