﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouristСenterLibrary.Entity;

namespace WebServer.Models
{
    public class HikeModel
    {
        public int ID { get; set; }
        public List<OrderModel> OrdersList { get; set; }
        public List<UserModel> Users { get; set; } = new List<UserModel>();
        public string StartTime { get; set; }
        public string FinishTime { get; set; }
        public string RouteName { get; set; }
        public string WayToTravel { get; set; }
        public string CompanyName { get; set; }
        public int PeopleAmount { get; set; }
        public string Status { get; set; }
        public bool IsPhotograph { get; set; }

        public HikeModel()
        {
        }

        public HikeModel(Hike.HikeView hike)
        {
            ID = hike.ID;
            StartTime = hike.StartTime;
            FinishTime = hike.FinishTime;
            RouteName = hike.RouteName;
            WayToTravel = hike.WayToTravel;
            CompanyName = hike.CompanyName;
            PeopleAmount = hike.PeopleAmount;
            Status = hike.Status;
            IsPhotograph = hike.IsPhotograph;
            var orders = hike.OrdersList;
            var ordersModel = new List<OrderModel>();
            foreach(var order in orders)
            {
                var orderView = Order.GetViewById(order.ID);
                ordersModel.Add(new OrderModel(orderView));

            }
            var users = hike.Users;
            foreach (var user in users)
            {
                Users.Add(new UserModel(user));
            }
        }
    }
}
