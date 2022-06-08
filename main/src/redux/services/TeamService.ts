import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {removeCookie, setCookie} from "typescript-cookie";
import {RegisterSuccess, RegisterFail, LoginSuccess, LoginFail, Logout} from "../actions/authActions"
import {Team,Teammate, InviteModel} from "../../models/TeamModel";
import authHeader from "../AuthHeader"

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
}

export default new TeamService();