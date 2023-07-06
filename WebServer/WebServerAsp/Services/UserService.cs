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
            User? user;
            if (!_context.User.Any(u => u.PhoneNumber == body.phone))
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
                try
                {
                    _context.User.Add(user);
                    _context.Team.Add(team);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return false;
                }

                if (user.NameOfCompany == null)
                {
                    var aloneTeam = new Team("Пойти в одиночку", user);
                    var aloneTeammate = new Teammate(aloneTeam, user) { IsActive = true, IsTeammate = true };
                    try
                    {
                        _context.Team.Add(aloneTeam);
                        _context.Teammate.Add(aloneTeammate);
                        _context.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }
            else
            {
                user = _context.User.First(u => u.PhoneNumber == body.phone);;
                if (user.Login == null)
                {
                    user.Login = body.login;
                    user.Password = body.password;
                    user.Email = body.email;
                    var team = new Team("Моя команда", user);
                    try
                    {
                        _context.Team.Add(team);
                        _context.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                    if (user.NameOfCompany == null)
                    {
                        var aloneTeam = new Team("Пойти в одиночку", user);
                        var aloneTeammate = new Teammate(aloneTeam, user) { IsActive = true, IsTeammate = true };
                        try
                        {
                            _context.Team.Add(aloneTeam);
                            _context.Teammate.Add(aloneTeammate);
                            _context.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        public User? GetUserByPhoneNumber(string phoneNumber)
        {
            return _context.User.Where(u => u.PhoneNumber == phoneNumber).FirstOrDefault();
        }
        
 
        

        
    }
}
