using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class CountableHikeEquipment
    {
        
        public int ID { get; set; }
        [Required] public CountableEquipment CountableEquipment { get; set; }
        [Required] public int Number { get; set; }
        [Required] public Hike Hike { get; set; }
        public CountableHikeEquipment()
        {
        }

        public CountableHikeEquipment(CountableEquipment equip, int number)
        {
            CountableEquipment = equip;
            Number = number;
        }
    }
}
