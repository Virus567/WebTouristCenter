using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using t =TouristСenterLibrary.Entity;
using WebServerAsp.Repositories;
using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Controllers
{
    [ApiController]
    [Route("orders")]
    public class OrderController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IRouteRepository _routeRepository;

        public OrderController(IUserRepository userRepository, IOrderRepository orderRepository, IRouteRepository routeRepository)
        {
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _routeRepository = routeRepository;
        }
        [HttpGet("{id:int}")]
        public IActionResult GetOrderFullInfo(int id)
        {
            var order = _orderRepository.GetViewById(id);
            if (order == null)
            {
                return BadRequest("Incorrect request");
            }
            var route = _routeRepository.GetRouteByName(order.RouteName);

            var orderModel = new OrderModel(order);
            return Ok(new { route = route, order = orderModel });
        }

        [HttpPost("add-order")]
        public IActionResult AddOrder(NewOrderModel order)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "user");
            if (userId is null) return BadRequest("Incorrect token");
            var user = _userRepository.GetUserByID(Convert.ToInt32(userId.Value));
            if (user is null) return BadRequest("Incorrect user");
            if (order is null) return BadRequest("Incorrect request");
            if (!NewOrderModel.Check(order)) return BadRequest("Incorrect request");

            if(!_orderRepository.AddOrder(order, user)) return BadRequest("Error adding");
            return Ok(new { email = user.Email, status = true });
        }

    }
}
