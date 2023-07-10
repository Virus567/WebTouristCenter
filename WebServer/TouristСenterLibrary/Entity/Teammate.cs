using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TouristСenterLibrary.Entity
{
    public class Teammate
    {
        public int ID { get; set; } 
        [Required] public Team Team { get; set; }
        [Required] public User User { get; set; }
        [Required] public bool IsTeammate { get; set; }
        [Required] public bool IsActive { get; set; }

        public Teammate()
        {
        }
        public Teammate(Team Team, User User)
        {
            this.Team = Team;
            this.User = User;
            this.IsTeammate = false;
            this.IsActive = false;
        }

    }
}
