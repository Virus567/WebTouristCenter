 using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class Equipment
    {
        public int ID { get; set; }
        [Required] public string Name { get; set; }
        [Required] public DateTime PurchaseDate { get; set; }
        [Required] public string Type { get; set; }
        public List<Hike> HikesList { get; set; }

        public Equipment()
        {
            HikesList = new List<Hike>();
        }
        public Equipment(string Name, DateTime PurchaseDate, string Type)
        {
            this.Name = Name;
            this.PurchaseDate = PurchaseDate;
            this.Type = Type;
            HikesList = new List<Hike>();
        }

    }
}
