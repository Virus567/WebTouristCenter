﻿using System;
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
        private static ApplicationContext db = ContextManager.db;
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
        public static List<OrderView> GetView()
        {
            List<OrderView> list = (from o in db.Order
                    select new OrderView()
                    {
                        ID = o.ID,
                        DateTime = o.StartTime.ToString("d"),
                        RouteName = o.Route.Name,
                        WayToTravel = o.WayToTravel,
                        TouristGroup = o.TouristGroup.User.GetCompanyNameForOrder(),
                        TouristGroupID = o.TouristGroup.ID,
                        PeopleAmount = o.TouristGroup.PeopleAmount,
                        ApplicationTypeName = o.ApplicationType.Name,
                        ChildrenAmount = o.TouristGroup.ChildrenAmount,
                        Status = o.Status,
                        IsPhotograph = o.IsPhotograph,
                        IsListParticipants = false
                    }).ToList();
            foreach(var l in list)
            {
                l.IsListParticipants = Participant.IsParticipantsForOrder(TouristGroup.GetGroupByID(l.TouristGroupID));
               
            }
            return list;
        }

        public static List<OrderView> GetViewByUserId(int userId)
        {
            try
            {
                List<OrderView> list = (from o in db.Order
                                    .Include(o => o.TouristGroup)
                                    .ThenInclude(o => o.User)
                                    .Include(o => o.TouristGroup)
                                    .ThenInclude(o => o.ParticipantsList)
                                        select new OrderView()
                                        {
                                            ID = o.ID,
                                            DateTime = o.StartTime.ToString("d"),
                                            RouteName = o.Route.Name,
                                            WayToTravel = o.WayToTravel,
                                            TouristGroup = o.TouristGroup.User.GetCompanyNameForOrder(),
                                            TouristGroupID = o.TouristGroup.ID,
                                            PeopleAmount = o.TouristGroup.PeopleAmount,
                                            ApplicationTypeName = o.ApplicationType.Name,
                                            ChildrenAmount = o.TouristGroup.ChildrenAmount,
                                            Status = o.Status,
                                            IsListParticipants = false
                                        }).ToList();
                foreach (var l in list)
                {
                    var touristGroup = TouristGroup.GetGroupByID(l.ID);
                    l.Users.Add(touristGroup.User);
                    foreach (var participant in touristGroup.ParticipantsList)
                    {
                        l.Users.Add(participant.User);
                    }
                }
                list = list.Where(o => o.Users.Contains(User.GetUserByID(userId)) && o.Status == "Активна").ToList();
                return list;
            }
            catch (Exception ex)
            {
                return new List<OrderView>();
            }
            
        }

        public static OrderView? GetViewById(int orderId)
        {
            try
            {
                OrderView? order = (from o in db.Order
                                    .Include(o => o.TouristGroup)
                                    .ThenInclude(o => o.User)
                                    .Include(o => o.TouristGroup)
                                    .ThenInclude(o => o.ParticipantsList)
                                    .Where(o=>o.ID == orderId)
                                        select new OrderView()
                                        {
                                            ID = o.ID,
                                            DateTime = o.StartTime.ToString("d"),
                                            RouteName = o.Route.Name,
                                            WayToTravel = o.WayToTravel,
                                            TouristGroup = o.TouristGroup.User.GetCompanyNameForOrder(),
                                            TouristGroupID = o.TouristGroup.ID,
                                            PeopleAmount = o.TouristGroup.PeopleAmount,
                                            ApplicationTypeName = o.ApplicationType.Name,
                                            ChildrenAmount = o.TouristGroup.ChildrenAmount,
                                            Status = o.Status,
                                            IsListParticipants = false
                                        }).FirstOrDefault();
                if(order != null)
                {
                    var touristGroup = TouristGroup.GetGroupByID(order.ID);
                    order.Users.Add(touristGroup.User);
                    foreach (var participant in touristGroup.ParticipantsList)
                    {
                        order.Users.Add(participant.User);
                    }
                }
                    
                return order;
            }
            catch (Exception ex)
            {
                return null;
            }

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
        public static void Add(Order order)
        {
            db.Order.Add(order);
            db.SaveChanges();
        }
        public static void Update(Order order)
        {
            db.Order.Update(order);
            db.SaveChanges();
        }
        public static OrderViewAll GetViewAllByID(int orderID)
        {
            OrderViewAll order = db.Order.Include(o => o.TouristGroup)
                                        .ThenInclude(o=>o.User)
                                        .Where(o => o.ID == orderID)
                                        .Select(o =>  new OrderViewAll()
                                        {
                                            ID = orderID,
                                            StartTime = o.StartTime.ToString("d"),
                                            FinishTime = o.FinishTime.ToString("d"),
                                            RouteName = o.Route.Name,
                                            WayToTravel = o.WayToTravel,
                                            TouristGroup = o.TouristGroup.GetCompanyNameForOrder(),
                                            TouristGroupID = o.TouristGroup.ID,
                                            PeopleAmount = o.TouristGroup.PeopleAmount,
                                            ApplicationType = o.ApplicationType.Name,
                                            ChildrenAmount =o.TouristGroup.ChildrenAmount,
                                            FoodlFeatures = o.FoodlFeatures,
                                            EquipmentFeatures = o.EquipmentFeatures,
                                            Status = o.Status,
                                            HermeticBagAmount = o.HermeticBagAmount,
                                            IndividualTentAmount =o.IndividualTentAmount
                                        }).FirstOrDefault();

            order.IsListParticipants = Participant.IsParticipantsForOrder(TouristGroup.GetGroupByID(order.TouristGroupID));
            return order;
        }
        public static Order GetOrderByID(int orderID)
        {
            var order = db.Order
                .Include(o => o.TouristGroup)
                .Include(o => o.Route)
                .Include(o => o.ApplicationType)
                .Include(o=>o.Hike)
                .Where(o => o.ID == orderID).FirstOrDefault();
            db.Participant.Where(p => p.TouristGroupID == order.TouristGroup.ID).Load();
            return order;
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
