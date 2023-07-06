import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Hike} from "../../models/HikeModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {Client} from "../../models/ClientModel";
import {Order} from "../../models/OrderModel";
import authHeader from "../AuthHeader";
import { Instructor } from "../../models/InstructorModel";
import { Route } from "../../models/RoutesModel";

const API_URL = "http://localhost:8080/hikes/";

class HikeService {
    getHikes() {
		return axios.get(API_URL, {headers: authHeader()})
        .then((response) => {
            console.log(response.data);
            const hikes: Hike[] = response.data.hikes;
            const orders: Order[] = response.data.orders;
            return {hikes: hikes, orders: orders};
            })
          .catch((error) => {
            console.log(error);
            return {hikes:[], orders:[]};
          });
    }

    addReport(startDate:string, finishDate:string) {
      return axios.post(API_URL + "add-report", {startDate:startDate, finishDate: finishDate},{headers: authHeader()})
          .then((response) => {            
              return response.data.status;
            })
            .catch((error) => {
              console.log(error);
              return false;
            });
      }
  

    getHikesWithParams(date:string, route:string, status:string) {
      return axios.get(API_URL + "get-with-params/"+ date +"/"+ route +"/"+ status, {headers: authHeader()})
          .then((response) => {
              console.log(response.data);
              const hikes: Hike[] = response.data.hikes;
              return hikes;
              })
            .catch((error) => {
              console.log(error);
              return [];
            });
      }

    getHikeFullInfo(id: number) {
      return axios.get(API_URL +id,{headers: authHeader()})
          .then((response) => {
              console.log(response.data);
              const route: Route = response.data.route;
              const hike: Hike = response.data.hike;
              const instructors: Instructor[] = response.data.instructors;
              return {hike: hike, instructors: instructors, route: route};
              })
            .catch((error) => {
              console.log(error);
              return {hike:null, instructors:[], route: null};
            });
      }
}
export default new HikeService();