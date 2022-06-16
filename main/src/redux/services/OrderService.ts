import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Hike} from "../../models/HikeModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {Client} from "../../models/ClientModel";
import {Order} from "../../models/OrderModel";
import {FinalOrderInfo} from "../../models/order/FinalOrderInfo";
import authHeader from "../AuthHeader";

const API_URL = "http://localhost:8080/orders/";

class OrderService {
    addOrder(order: FinalOrderInfo) {
		return axios.post(API_URL + "add-order", order, {headers: authHeader()})
        .then((response) => {
            const data: Answer = response.data;
            if(data.status){
              const email: string = data.answer.email;
              return {status: data.status, email: email};   
            }
            return {status: false, email: ""}; 
          })
          .catch((error) => {
            console.log(error);
            return {status: false, email: ""};
          });
    }
}
export default new OrderService();