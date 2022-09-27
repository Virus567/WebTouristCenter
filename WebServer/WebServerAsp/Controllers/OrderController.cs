using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using t =TouristСenterLibrary.Entity;
using WebServerAsp.Repositories;
using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Controllers
{

    [Authorize]
    [ApiController]
    [Route("orders")]
    public class OrderController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrderRepository _orderRepository;

        public OrderController(IUserRepository userRepository, IOrderRepository orderRepository)
        {
            _userRepository = userRepository;
            _orderRepository = orderRepository;
        }
        [HttpGet("{id:int}")]
        public IActionResult GetOrderFullInfo(int id = 0)
        {
            var order = Order.GetViewById(Convert.ToInt32(id));
            if (order == null)
            {
                return BadRequest("Incorrect request");
            }
            var route = t.Route.GetRouteByRouteName(order.RouteName);

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
            return Ok(new { email = user.Email });
        }

    }
}
