using TouristСenterLibrary.Entity;
using WebServerAsp.Models;

namespace WebServerAsp.Repositories
{
    public interface IOrderRepository
    {
        public List<OrderModel> GetOrders(int userId);
        public bool AddOrder(NewOrderModel order, User user);
        public Order.OrderView? GetViewById(int orderId);
    }
}
