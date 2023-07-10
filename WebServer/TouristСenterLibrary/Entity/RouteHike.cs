using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class RouteHike
    {
        public int ID { get; set; }
        [Required] public Route Route { get; set; }
        [Required] public Transport StartBus { get; set; }
        [Required] public Transport FinishBus { get; set;}
        [Required] public Hike Hike { get; set; }

        public RouteHike()
        {

        }

        public RouteHike(Route Route, Transport StartBus, Transport FinishBus, Hike Hike)
        {
            this.Route = Route;
            this.StartBus = StartBus;
            this.FinishBus = FinishBus;
            this.Hike = Hike;
        }
    }

    
}
