using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace TouristСenterLibrary.Entity
{
    public class Participant
    {
        public int ID { get; set; }
        [Required] public  TouristGroup TouristGroup { get; set; }
        [Required] public int TouristGroupID { get; set; }
        [Required] public User User { get; set; }

        public Participant()
        {
        }
        public Participant(User User)
        {
            this.User = User;
        }
    }
}
