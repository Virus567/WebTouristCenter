using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Repositories
{
    public interface IInstructorRepository
    {
        public IQueryable<InstructorModel> GetInstructors();
    }
}
