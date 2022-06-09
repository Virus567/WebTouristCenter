import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {removeCookie, setCookie} from "typescript-cookie";
import {RegisterSuccess, RegisterFail, LoginSuccess, LoginFail, Logout} from "../actions/authActions"
import {Team,Teammate, InviteModel} from "../../models/TeamModel";
import authHeader from "../AuthHeader";
import {Client} from "../../models/ClientModel";

const API_URL = "http://localhost:8080/teams/";

class TeamService {
    getTeams() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response) => {
            console.log(response.data);
            const data: Answer = response.data;
            const teams: Team [] = data.answer.teams;
            const teammates: Teammate [] = data.answer.teammates;
            const invites: InviteModel [] = data.answer.invites;
            return {teams: teams, teammates: teammates, invites: invites};
          }) 
          .catch((error) => {
            console.log(error);
            return {teams: [], teammates: [], invites: []};
          });
	  }
    getTeammatesByTeamID(id: number) {
      return axios.get(API_URL + "team-id?id=" + id)
        .then((response) => {
          const data: Answer = response.data;
          const teammates : Teammate [] = data.answer.teammates
          return teammates;
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }

    findByLogin(login: string){
      return axios.get(API_URL + "find-by-login?login=" + login)
      .then((response) => {
        const data: Answer = response.data;
        const user : Client = data.answer.user;
        const fullName : string = data.answer.fullName;
        return {user: user, fullName: fullName};
      })
      .catch((error) => {
        console.log(error);
        return {user: null, fullName: null};
      });
    }
}

export default new TeamService();