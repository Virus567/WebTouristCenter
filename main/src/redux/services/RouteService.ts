import axios from "axios";
import {Answer, LoginModel, RegistrationModel} from "../../models/RequestModels";
import {HikeRoute} from "../../models/RoutesModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {RegisterSuccess, RegisterFail, LoginSuccess, LoginFail, Logout} from "../actions/authActions"
import {Client} from "../../models/ClientModel";

const API_URL = "http://localhost:8080/routes/";

class RouteService {
    GetRoutes() {
		return axios.get(API_URL + "get")
        .then((response) => {
            console.log(response.data);
            const data: Answer = response.data;
            const routes: HikeRoute[] = data.answer.routes
            return routes;
          })
          .catch((error) => {
            console.log(error);
            return []
          });
	}
}

export default new RouteService();