using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Data;
using Microsoft.EntityFrameworkCore;

namespace TouristСenterLibrary.Entity
{
    public class TouristGroup
    {
        public int ID { get; set; }
        [Required] public int PeopleAmount { get; set; }
        [Required] public int ChildrenAmount { get; set; }
        [Required] public User User { get; set; }
        public List<Participant> ParticipantsList { get; set; }

        public TouristGroup()
        {
            ParticipantsList = new List<Participant>();
        }
        public TouristGroup(User User, int PeopleAmount,int ChildrenAmount)
        {
            this.User = User;
            this.PeopleAmount = PeopleAmount;
            this.ChildrenAmount = ChildrenAmount;
            ParticipantsList = new List<Participant>();
        }

        public  string GetFullName()
        {
            return User.GetFullName();
        }
        public string GetCompanyNameForHike()
        {
            return User.GetCompanyNameForHike();
        }
        public string GetCompanyNameForOrder()
        {
            return User.GetCompanyNameForOrder();
        }

    }
}
