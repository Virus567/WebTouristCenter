using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using t = TouristСenterLibrary.Entity;
using WebServerAsp.Models;
using WebServerAsp.Repositories;
using TouristСenterLibrary.Entity;
using System.Net.Mail;
using System.Net;

namespace WebServerAsp.Controllers
{
    [ApiController]
    [Route("hikes")]
    public class HikeController : ControllerBase
    {
        private readonly IHikeRepository _hikeRepository;
        private readonly IUserRepository _userRepository;
        private readonly IOrderRepository _orderRepository;

        public HikeController(IHikeRepository hikeRepository, IUserRepository userRepository, IOrderRepository orderRepository)
        {
            _hikeRepository = hikeRepository;
            _userRepository = userRepository;
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public IActionResult GetHikes()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var user = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (user is null) return BadRequest("Incorrect user");
            var hikes = _hikeRepository.GetHikes(user.ID);
            var orders = _orderRepository.GetOrders(user.ID);
            return Ok(new {hikes = hikes, orders = orders});
        }

        [HttpGet("get-with-params/{date}/{route}/{status}")]
        public IActionResult GetHikesWithParams(string date, string route, string status)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var user = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (user is null) return BadRequest("Incorrect user");

            List<Hike.HikeView> hikes = Hike.GetViewByUserID(user.ID);
            if (date != "") hikes = hikes.Where(h => h.StartTime == DateTime.Parse(date).ToString("d")).ToList();
            if (route != "") hikes = hikes.Where(h => h.RouteName == route).ToList();
            if (status != "") hikes = hikes.Where(h => h.Status == status).ToList();
           
            var hikesModel = new List<HikeModel>();
            foreach (var hike in hikes)
            {
                hikesModel.Add(new HikeModel(hike));
            }
            return Ok(new {hikes = hikes});
        }

        [HttpGet("{id:int}")]
        public IActionResult GetHikeFullInfo(int id)
        {
            var hike = Hike.GetViewByID(Convert.ToInt32(id));
            if (hike == null)
            {
                return BadRequest("Incorrect request");
            }
            var route = t.Route.GetRouteByRouteName(hike.RouteName);
            var instructors = Instructor.GetInstructorViewsByHikeID(hike.ID);

            var hikeModel = new HikeModel(hike);
            return Ok(new { route = route, hike = hikeModel, instructors = instructors });
        }

        [HttpPost("add-report")]
        public IActionResult AddReport(DatesModel dates)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var user = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (user is null) return BadRequest("Incorrect user");

            if (dates == null) return BadRequest("Incorrect request");
            if (dates.startDate == null || dates.finishDate == null) return BadRequest("Incorrect request");

            if (!_hikeRepository.AddReport(dates, user)) return BadRequest("Error adding");
            return Ok(new {status = true});
        }


    }
}
