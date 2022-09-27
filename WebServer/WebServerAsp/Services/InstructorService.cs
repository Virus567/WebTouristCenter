using TouristСenterLibrary;
using TouristСenterLibrary.Entity;
using WebServerAsp.Repositories;
using WebServerAsp.Models;

namespace WebServerAsp.Services
{
    public class InstructorService : IInstructorRepository
    {
        private readonly ApplicationContext _context;
        public InstructorService(ApplicationContext context)
        {
            _context = context;
        }
        public IQueryable<InstructorModel> GetInstructors()
        {
            var instructors = Instructor.GetInstructors();
            var instructorModels = new List<InstructorModel>();
            foreach (var i in instructors)
            {
                instructorModels.Add(new InstructorModel(i.ID, i.Surname, i.Name, i.Middlename, i.Image, i.Discription));
            }

            return (IQueryable<InstructorModel>) instructorModels;
        }
    }
}
