using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class Route
    {
        public int ID { get; set; }
        [Required] public string Name { get; set; }
        [Required] public int NumberDays { get; set; }
        [Required] public string Description { get; set; }
        public string FullDescription { get; set; }
        [Required] public CheckpointRoute CheckpointStart { get; set; }
        public int CheckpointStartID { get; set; }
        [Required] public CheckpointRoute CheckpointFinish { get; set; }
        public int CheckpointFinishID { get; set; }
        [Required] public string River { get; set; }
        [Required] public string[] Images { get; set; }
        [Required] public int Popularity { get; set; }

        public Route()
        {

        }
        public Route(string Name, int NumberDays, string Description)
        {
            this.Name = Name;
            this.NumberDays = NumberDays;
            this.Description = Description;
        }
    }
}
