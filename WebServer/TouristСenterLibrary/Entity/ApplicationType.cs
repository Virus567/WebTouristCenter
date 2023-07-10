using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TouristСenterLibrary.Entity
{
    public class ApplicationType
    {
        
        public int ID { get; set; }
        [Required] public string Name { get; set; }

        public ApplicationType()
        {

        }
        public ApplicationType(string Name)
        {
            this.Name = Name;
        }
        
    }

}
