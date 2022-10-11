import axios from "axios";
import {Answer, LoginModel, RegistrationModel} from "../../models/RequestModels";
import {Route} from "../../models/RoutesModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {RegisterSuccess, RegisterFail, LoginSuccess, LoginFail, Logout} from "../actions/authActions"
import {Client} from "../../models/ClientModel";

const API_URL = "http://localhost:8080/routes/";

class RouteService {
    getRoutes() {
		return axios.get(API_URL + "")
        .then((response) => {
            console.log(response.data);
            const routes: Route[] = response.data;
            return routes;
            })
          .catch((error) => {
            console.log(error);
            return [];
          });
	  }

    getRoutesWithParams(sort:string, river:string, search:string, days:string) {
      return axios.get(API_URL + "?sort="+ sort +"&river="+ river +"&search="+ search +"&days="+ days)
          .then((response) => { 
              const routes: Route[] = response.data
              return routes;
            })
            .catch((error) => {
              console.log(error);
              return []
            });
      }
    getRouteById(id: string) {
      return axios.get(API_URL + id)
        .then((response) => {
          const route : Route = response.data
          return route;
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
}

export default new RouteService();