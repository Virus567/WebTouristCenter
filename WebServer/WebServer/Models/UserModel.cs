using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouristСenterLibrary.Entity;

namespace WebServer.Models
{
    public class UserModel
    {
        public int ID { get; set; }
        public string Login { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string? MiddleName { get; set; }

        public UserModel(User user)
        {
            ID = user.ID;
            Login = user.Login;
            Surname = user.Surname;
            Name = user.Name;
            MiddleName = user.Middlename;
        }
    }
}
