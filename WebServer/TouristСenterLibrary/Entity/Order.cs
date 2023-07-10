using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.ComponentModel;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace TouristСenterLibrary.Entity
{
    public class Order 
    {
        public int ID { get; set; }
        [Required] public ApplicationType ApplicationType { get; set; }
        [Required] public Route Route { get; set; }
        [Required] public Employee Employee { get; set; }
        [Required] public TouristGroup TouristGroup { get; set; }
        [Required] public string WayToTravel { get; set; }
        public string? FoodlFeatures { get; set; }
        public string? EquipmentFeatures { get; set; }
        [Required] public DateTime StartTime { get; set; }
        [Required] public DateTime FinishTime { get; set; }
        [Required] public string Status { get; set; }
        public Hike? Hike { get; set; }
        [Required] public int HermeticBagAmount { get; set; }
        [Required] public int IndividualTentAmount { get; set; }
        public Instructor? Instructor { get; set; }
        public bool IsPhotograph { get; set; }

        public Order()
        {

        }
        public enum EnumStatus
        {
            [Description("Активна")] active = 1,
            [Description("В сборке")] inAssembly = 2,
            [Description("Завершена")] сompleted = 3,
            [Description("Отменена")] canceled = 4
        }

        public class OrderView
        {
            public int ID { get; set; }
            public List<User> Users { get; set; } = new List<User>();
            public string DateTime { get; set; }
            public string FinishTime { get; set; }
            public string RouteName { get; set; }
            public string WayToTravel { get; set; }
            public string TouristGroup { get; set; }
            public int TouristGroupID { get; set;}
            public int PeopleAmount { get; set; }
            public int ChildrenAmount { get; set; }
            public string ApplicationTypeName { get; set; }
            public string Status { get; set; }
            public bool IsListParticipants { get; set; }
            public bool IsPhotograph { get; set; }
        }
        
        public class OrderViewAll
        {
            public int ID { get; set; }
            public string StartTime { get; set; }
            public string FinishTime { get; set; }
            public string RouteName { get; set; }
            public string WayToTravel { get; set; }
            public string TouristGroup { get; set; }
            public int TouristGroupID { get; set; }
            public int PeopleAmount { get; set; }
            public int ChildrenAmount { get; set; }
            public string ApplicationType { get; set; }
            public string Status { get; set; }
            public int HermeticBagAmount { get; set; }
            public int IndividualTentAmount { get; set; }
            public string FoodlFeatures { get; set; }
            public string EquipmentFeatures { get; set; }
            public bool IsListParticipants { get; set; }

        }
        
        public static string GetDescriptionByEnum(Enum enumElement)
        {
            Type type = enumElement.GetType();
            MemberInfo[] memInfo = type.GetMember(enumElement.ToString());
            if (memInfo != null && memInfo.Length > 0)
            {
                object[] attrs = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (attrs != null && attrs.Length > 0)
                    return ((DescriptionAttribute)attrs[0]).Description;
            }
            return enumElement.ToString();
        }
        
    }
}
