using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.ComponentModel;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace TouristСenterLibrary.Entity
{
    public class Hike
    {
        public int ID { get; set; }
        [Required] public Route Route { get; set; }
        [Required] public string Status { get; set; }
        public List<Order> OrdersList { get; set; }
        public List<CountableHikeEquipment> CountableHikeEquipList { get; set; }
        public List<Equipment> EquipmentsList { get; set; }
        public Hike()
        {
            OrdersList = new List<Order>();
            CountableHikeEquipList = new List<CountableHikeEquipment>();
            EquipmentsList = new List<Equipment>();
        }
        public Hike(Route Route,string Status)
        {
            this.Route = Route;
            this.Status = Status;
            OrdersList = new List<Order>();
            CountableHikeEquipList = new List<CountableHikeEquipment>();
            EquipmentsList = new List<Equipment>();
        }

        public enum EnumStatus
        {
            [Description("В сборке")] inAssembly = 1,
            [Description("На маршруте")] onRoute = 2,
            [Description("Завершен")] сompleted = 3,
            [Description("Отменен")] canceled = 4
        }

        public class HikeView
        {
            public int ID { get; set; }
            public List<Order> OrdersList { get; set; }
            public List<User> Users { get; set; } = new List<User>();
            public string StartTime { get; set; }
            public string FinishTime { get; set; }
            public string RouteName { get; set; }
            public string WayToTravel { get; set; }
            public string CompanyName { get; set; }
            public int PeopleAmount { get; set; }
            public string Status { get; set; }
            public bool IsPhotograph { get; set; }
        }
        

        public class HikeViewAll
        {
            public int ID { get; set; }
            public List<Order> OrdersList { get; set; }
            public string StartTime { get; set; }
            public string FinishTime { get; set; }
            public string RouteName { get; set; }
            public string WayToTravel { get; set; }
            public string CompanyName { get; set; }
            public int PeopleAmount { get; set; }
            public int ChildrenAmount { get; set; }
            public string Status { get; set; }
            public int HermeticBagAmount { get; set; }
            public int IndividualTentAmount { get; set; }
        }

        public static int GetIndividualTentsAmount(Hike hike)
        {
            int count = 0;
            foreach(var order in hike.OrdersList)
            {
                count += order.IndividualTentAmount;
            }
            return count;
        }
        public static int GetHermeticBagsAmount(Hike hike)
        {
            int count = 0;
            foreach (var order in hike.OrdersList)
            {
                count += order.HermeticBagAmount;
            }
            return count;
        }
        public static List<string> GetPossibleStatuses(string str)
        {
            EnumStatus startStatus = GetEnumByDescription<EnumStatus>(str);
            List<string> list = new List<string>();
            foreach (EnumStatus status in Enum.GetValues(typeof(EnumStatus)))
            {
                if (status >= startStatus )
                {
                    list.Add(GetDescriptionByEnum(status));
                }
            }
            return list;
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
        public static T GetEnumByDescription<T>(string description) where T : Enum
        {
            foreach (var field in typeof(T).GetFields())
            {
                if (Attribute.GetCustomAttribute(field,
                typeof(DescriptionAttribute)) is DescriptionAttribute attribute)
                {
                    if (attribute.Description == description)
                        return (T)field.GetValue(null);
                }
                else
                {
                    if (field.Name == description)
                        return (T)field.GetValue(null);
                }
            }
            throw new ArgumentException("Enum is not found!", nameof(description));
        }

    }
}
