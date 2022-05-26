import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Order} from "../../models/OrderModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {Client} from "../../models/ClientModel";

const API_URL = "http://localhost:8080/orders/";

class OrderService {
    getOrders(clientId: number) {
		return axios.post(API_URL + "get",clientId)
        .then((response) => {
            console.log(response.data);
            const data: Answer = response.data;
            const orders: Order[] = data.answer.routes
            return orders;
          })
          .catch((error) => {
            console.log(error);
            return []
          });
    }
}
export default new OrderService();