﻿using System.ComponentModel.DataAnnotations;

namespace TouristСenterLibrary.Entity
{
    public class CheckpointRoute
    {
        public int ID { get; set; }
        [Required] public string  Title { get; set; }
        [Required] public string Type { get; set; }

        public CheckpointRoute()
        {

        }
        public CheckpointRoute(string Title, string Type)
        {
            this.Title = Title;
            this.Type = Type;      
        }

    }
}
