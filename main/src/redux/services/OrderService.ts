import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Hike} from "../../models/HikeModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {Client} from "../../models/ClientModel";
import {Order} from "../../models/OrderModel";
import {FinalOrderInfo} from "../../models/order/FinalOrderInfo";
import authHeader from "../AuthHeader";
import { Route } from "../../models/RoutesModel";

const API_URL = "http://localhost:8080/orders/";

class OrderService {
    addOrder(order: FinalOrderInfo) {
		return axios.post(API_URL + "add-order", order, {headers: authHeader()})
        .then((response) => {
            const email: string = response.data.answer.email;
            return {status: response.data.status, email: email};   
            })
          .catch((error) => {
            console.log(error);
            return {status: false, email: ""};
          });
    }

    getOrderFullInfo(id: number) {
      return axios.get(API_URL + id,{headers: authHeader()})
          .then((response) => {
              console.log(response.data);
              const route: Route = response.data.answer.route;
              const order: Order = response.data.answer.order;
              return {order: order, route: route};
              })
            .catch((error) => {
              console.log(error);
              return {order:null, route: null};
            });
      }
}
export default new OrderService();