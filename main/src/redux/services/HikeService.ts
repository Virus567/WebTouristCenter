import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Hike} from "../../models/HikeModel";
import {removeCookie, setCookie} from "typescript-cookie";
import {Client} from "../../models/ClientModel";

const API_URL = "http://localhost:8080/hikes/";

class HikeService {
    getHikes(clientId: number) {
		return axios.post(API_URL + "get", clientId)
        .then((response) => {
            console.log(response.data);
            const data: Answer = response.data;
            const hikes: Hike[] = data.answer.routes
            return hikes;
          })
          .catch((error) => {
            console.log(error);
            return []
          });
    }
}
export default new HikeService();