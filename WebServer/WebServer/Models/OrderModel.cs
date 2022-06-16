using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouristСenterLibrary.Entity;

namespace WebServer.Models
{
    public class OrderModel
    {
        public int ID { get; set; }
        public List<UserModel> Users { get; set; } = new List<UserModel>();
        public string DateTime { get; set; }
        public string RouteName { get; set; }
        public string WayToTravel { get; set; }
        public string TouristGroup { get; set; }
        public int TouristGroupID { get; set; }
        public int PeopleAmount { get; set; }
        public int ChildrenAmount { get; set; }
        public string ApplicationTypeName { get; set; }
        public string Status { get; set; }
        public bool IsListParticipants { get; set; }
        public bool IsPhotograph { get; set; }

        public OrderModel()
        {
        }

        public OrderModel(Order.OrderView order)
        {
            ID = order.ID;
            var users = order.Users;
            foreach (var user in users)
            {
                if(user != null)
                    Users.Add(new UserModel(user));
            }
            DateTime = order.DateTime;
            RouteName = order.RouteName;
            WayToTravel = order.WayToTravel;
            TouristGroup = order.TouristGroup;
            PeopleAmount = order.PeopleAmount;
            ChildrenAmount = order.ChildrenAmount;
            ApplicationTypeName = order.ApplicationTypeName;
            Status = order.Status;
            IsListParticipants = order.IsListParticipants;
            IsPhotograph = order.IsPhotograph;
        }
    }
}
