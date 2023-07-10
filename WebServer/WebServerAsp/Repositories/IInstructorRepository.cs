using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Repositories
{
    public interface IInstructorRepository
    {
        public List<InstructorModel> GetInstructors();
        public List<Instructor.InstructorView> GetInstructorViewsByHikeID(int hikeId);
    }
}
