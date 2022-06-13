using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouristСenterLibrary.Entity;

namespace WebServer.Models
{
    public class TeamModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public UserModel MainUser { get; set; }
        public List<TeammateModel> Teammates { get; set; }

        public TeamModel(Team team)
        {
            ID = team.ID;
            Name = team.Name;
            MainUser = new UserModel(team.MainUser);
            List<TeammateModel> teammatesList = new List<TeammateModel>();
            foreach (var t in team.Teammates)
            {
                teammatesList.Add(new TeammateModel(t));
            }
            Teammates = teammatesList;
        }
    }
}
