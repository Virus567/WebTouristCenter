using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class Employee : Human
    {
        public int ID { get; set; }
        [Required] public string PassportData { get; set; }
        [Required] public Role Role { get; set; }
        public int RoleID { get; set; }
        [Required] public DateTime EmploymentDate { get; set; }

        public Employee()
        {

        }
        public Employee(string Surname,string Name,string? Middlename,string PassportData,
                        string PhoneNumber, DateTime EmploymentDate) : base(Surname, Name, Middlename, PhoneNumber)
        {
            this.Surname = Surname;
            this.Name = Name;
            this.Middlename = Middlename;
            this.PassportData = PassportData;
            this.PhoneNumber = PhoneNumber;
            this.EmploymentDate = EmploymentDate;
        }
    }
}
