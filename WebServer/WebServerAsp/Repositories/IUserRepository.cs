using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Repositories
{
    public interface IUserRepository
    {
        public User? GetUserByID(int id);
        public User? GetUserByLogin(string login);
        public bool RegisterUser(RegModel regModel);
        public User? GetUserAuth(string login, string password);
    }
}
