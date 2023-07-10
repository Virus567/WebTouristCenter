using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TouristСenterLibrary.Entity
{
    public class User : Human
    {
        public int ID { get; set; }
        public string? Login { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? NameOfCompany { get; set; }
        public List<Teammate> TeammateList { get; set; }

        public User()
        {
            TeammateList = new List<Teammate>();
        }

        public User(string Surname, string Name, string PhoneNumber)
        {
            this.Surname = Surname;
            this.Name = Name;
            this.PhoneNumber = PhoneNumber;
            TeammateList = new List<Teammate>();
        }

        public User(string NameOfCompany, string Surname, string Name, string Middlename,
            string PhoneNumber) : base(Surname, Name, Middlename, PhoneNumber)
        {
            this.NameOfCompany = NameOfCompany;
        }


        public string GetCompanyNameForHike()
        {
            string tmp;
            if (NameOfCompany != null)
                tmp = $"{NameOfCompany}";
            else
            {
                tmp = "Сборная";
            }
            return tmp;
        }
        public string GetCompanyNameForOrder()
        {
            string tmp;
            if (NameOfCompany != null)
                tmp = $"{NameOfCompany}";
            else
            {
                tmp = $"{Surname} {Name.Substring(0, 1)}.";
                if (Middlename != null) tmp += $" {Middlename.Substring(0, 1)}.";
            }
            return tmp;
        }
        

    }
}
