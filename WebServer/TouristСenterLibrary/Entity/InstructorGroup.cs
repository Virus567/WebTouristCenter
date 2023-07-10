using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class InstructorGroup
    {
        public int ID { get; set; }
        public List<Instructor> InstructorsList { get; set; }
        [Required] public virtual Hike Hike { get; set; }

        public InstructorGroup()
        {
            InstructorsList = new List<Instructor>();
        }

       

    }
    
}
