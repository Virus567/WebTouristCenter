using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using WebServerAsp.Repositories;

namespace WebServerAsp.Controllers
{
    [ApiController]
    [Route("instructors")]
    public class InstructorController : ControllerBase
    {
        private readonly IInstructorRepository _instructorRepository;

        public InstructorController(IInstructorRepository instructorRepository)
        {
            _instructorRepository = instructorRepository;
        }

        [HttpGet]
        public IActionResult GetInstructors()
        {
            var instructors = _instructorRepository.GetInstructors();
            return Ok(new { instructors = instructors });
        }


    }
}
