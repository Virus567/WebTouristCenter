using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouristСenterLibrary.Entity;

namespace WebServerAsp.Models
{
    public class ClientModel
    {
        public int ID { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string? Middlename { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Login { get; set; }
        public string? NameOfCompany { get; set; }

        public ClientModel(User user)
        {
            ID = user.ID;
            Surname = user.Surname;
            Name = user.Name;
            Middlename = user.Middlename;
            Email = user.Email;
            PhoneNumber = user.PhoneNumber;
            Login = user.Login;
            NameOfCompany = user.NameOfCompany;
        }

    }
}
