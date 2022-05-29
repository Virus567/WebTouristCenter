import axios from "axios";
import {Answer, LoginModel, RegistrationModel} from "../../models/RequestModels";
import {Route} from "../../models/RoutesModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {RegisterSuccess, RegisterFail, LoginSuccess, LoginFail, Logout} from "../actions/authActions"
import {Client} from "../../models/ClientModel";

const API_URL = "http://localhost:8080/routes/";

class RouteService {
    getRoutes() {
		return axios.get(API_URL + "get")
        .then((response) => {
            console.log(response.data);
            const data: Answer = response.data;
            const routes: Route[] = data.answer.routes
            return routes;
          })
          .catch((error) => {
            console.log(error);
            return []
          });
	  }
    getRouteById(id: string) {
      return axios.post(API_URL + "id", id)
        .then((response) => {
          const data: Answer = response.data;
          const route : Route = data.answer.route
          return route;
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
}

export default new RouteService();