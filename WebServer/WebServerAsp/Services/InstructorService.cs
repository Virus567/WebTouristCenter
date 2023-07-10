using Microsoft.EntityFrameworkCore;
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
        public List<InstructorModel> GetInstructors()
        {
            var instructors = (from i in _context.Instructor
                select new Instructor.InstructorView()
                {
                    ID = i.ID,
                    Surname = i.Surname,
                    Name = i.Name,
                    Middlename = i.Middlename,
                    InstructorTelefonNumber = i.PhoneNumber,
                    Image = i.Image,
                    Discription = i.Discription,
                    InHike = false
                }).ToList();
            var instructorModels = new List<InstructorModel>();
            foreach (var i in instructors)
            {
                instructorModels.Add(new InstructorModel(i.ID, i.Surname, i.Name, i.Middlename, i.Image, i.Discription));
            }

            return instructorModels;
        }

        public List<Instructor.InstructorView> GetInstructorViewsByHikeID(int hikeId)
        {
            var instructors = _context.InstructorGroup.Include(i => i.Hike)
                .Include(i => i.InstructorsList).First(i => i.Hike.ID == hikeId).InstructorsList.Select(s =>
                new Instructor.InstructorView()
                {
                    ID = s.ID,
                    Surname = s.Surname,
                    Name = s.Name,
                    Middlename = s.Middlename,
                    InstructorTelefonNumber = s.PhoneNumber,
                    Discription = s.Discription,
                    Image = s.Image
                }).ToList();
            return instructors;
        }
    }
}
