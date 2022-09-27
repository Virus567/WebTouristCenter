using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using t = TouristСenterLibrary.Entity;

namespace WebServerAsp.Models
{
    public class NewOrderModel
    {
        public t.Route route { get; set; }
        public string dateStart { get; set; }
        public string dateFinish { get; set; }
        public string wayToTravel { get; set; }
        public bool isPhotograph { get; set; }
        public InstructorModel instructor { get; set; }
        public int peopleAmount { get; set; }
        public int childrenAmount { get; set; }
        public List<TeammateModel> teammates { get; set; }
        public List<ParticipantModel> participants { get; set; }
        public string? allergyComment { get; set; }
        public string? equipmentComment { get; set; }
        public bool isDiabetic { get; set; }
        public bool isVegetarian { get; set; }
        public int personalTent { get; set; }
        public int hermeticBag { get; set; }

        public static bool Check(NewOrderModel order)
        {
            return /*order.route != null &&*/
                   order.dateStart != null &&
                   order.dateFinish != null &&
                   order.wayToTravel != null &&
                   order.peopleAmount != null;
                  // (order.teammates != null || order.participants != null);           
        }
    }
}
