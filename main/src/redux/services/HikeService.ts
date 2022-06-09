import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Hike} from "../../models/HikeModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {Client} from "../../models/ClientModel";
import {Order} from "../../models/OrderModel";
import authHeader from "../AuthHeader";

const API_URL = "http://localhost:8080/hikes/";

class HikeService {
    getHikes() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response) => {
            console.log(response.data);
            const data: Answer = response.data;
            if(data.status){
               const hikes: Hike[] = data.answer.hikes
            const orders: Order[] = data.answer.orders
            return {hikes: hikes, orders: orders};
            }
            return {hikes:[], orders:[]}
          })
          .catch((error) => {
            console.log(error);
            return []
          });
    }
}
export default new HikeService();