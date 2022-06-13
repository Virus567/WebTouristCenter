using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using TouristСenterLibrary.Entity;
using Trivial.Security;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/instructors")]
    public class InstructorHandler : RequestHandler
    {

        [Get("get")]
        public void GetInstructors()
        {
            var instructors = Instructor.GetInstructors();
            if (instructors.Count == 0)
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }
            var instructorModels = new List<InstructorModel>();
            foreach (var i in instructors)
            {
                instructorModels.Add(new InstructorModel(i.ID, i.Surname, i.Name, i.Middlename, i.Image, i.Discription));
            }

            Send(new AnswerModel(true, new { instructors = instructorModels }, null, null));
        }
    }
}
