using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class Instructor : Human
    {
        public int ID { get; set; }
        [Required] public string PassportData { get; set; }
        [Required] public DateTime EmploymentDate { get; set; }
        [Required] public string Login { get; set; }
        [Required] public string Password { get; set; }
        [Required] public string Image { get; set; }
        [Required] public string Discription { get; set; }

        public List<InstructorGroup> InstructorGroups { get; set; } = new List<InstructorGroup>();

        public Instructor()
        {

        }
        public Instructor(string Surname,string Name,string Middlename, string PassportData, 
                          string PhoneNumber, DateTime EmploymentDate) : base(Surname, Name, Middlename, PhoneNumber)
        {
            this.PassportData = PassportData;
            this.EmploymentDate = EmploymentDate;
        }
        public class InstructorView
        {
            public int ID { get; set; }
            public string Surname { get; set; }
            public string Name { get; set; }
            public string Middlename { get; set; }
            public string InstructorTelefonNumber { get; set; }
            public bool InHike { get; set; }
            public string Image { get; set; }
            public string Discription { get; set; }
        }
        
    }
}
