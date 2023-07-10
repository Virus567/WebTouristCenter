using Npgsql;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class Transport
    {
        public int ID { get; set; }
        [MaxLength(6)] [Required] public string CarNumber { get; set; }
        [Required] public int SeatCount { get; set; }
        [Required] public TransportCompany TransportCompany { get; set;}
        [Required] public int TransportCompanyID { get; set; }

        public Transport()
        {

        }
        public Transport(string CarNumber, int SeatCount)
        {
            this.CarNumber = CarNumber;
            this.SeatCount = SeatCount;
        }

        public class TransportView
        {
            public int ID { get; set; }
            public string CarNumber { get; set; }
            public int SeatCount { get; set; }
            public string TransportCompanyName { get; set; }
            public bool IsStartBus { get; set; }
            public bool IsFinishBus { get; set; }
        }
    }
}
