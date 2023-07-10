using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TouristСenterLibrary.Entity
{
    public class Team
    {
        public int ID { get; set; }
        [Required] public string Name { get; set; }
        [Required] public User MainUser { get; set; }
        [Required] public List<Teammate> Teammates { get; set; }

        public Team()
        {
            Teammates = new List<Teammate>();
        }

        public Team(string Name, User MainUser)
        {
            this.Name = Name;
            this.MainUser = MainUser;
            Teammates = new List<Teammate>();
        }

    }
}
