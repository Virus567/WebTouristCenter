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
        console.log(authHeader())
		return axios.get(API_URL, {headers: authHeader()})
        .then((response) => {
            console.log(response)
              const teams: Team [] = response.data.teams;
              const team: Team = response.data.team;
              const teammates: Teammate [] = response.data.teammates;
              const invitesTeammates: Teammate [] = response.data.invitesTeammates;
              const invites: InviteModel [] = response.data.invites;
              return {teams: teams, team:team, teammates: teammates, invites: invites, invitesTeammates: invitesTeammates};
            }) 
          .catch((error) => {
            console.log(error);
            return {teams: [], team: null, teammates: [], invites: [], invitesTeammates:[]};
          });
	  }

    changeTeamByTeamId(id: number){
      return axios.get(API_URL + "change-team/" + id)
      .then((response) => {
          const teammates : Teammate [] = response.data.teammates;
          const invitesTeammates : Teammate [] = response.data.invitesTeammates;
          const team : Team = response.data.team
          return {team:team, teammates: teammates, invitesTeammates: invitesTeammates};
        })
      .catch((error) => {
        console.log(error);
        return {team:[], teammates: [], invitesTeammates:[]};
      });
    }

    getDefaultTeammatesByUser() {
      return axios.get(API_URL + "default-teammates", {headers: authHeader()})
        .then((response) => {
          const teammates: Teammate[] = response.data.teammates;
          const team: Team = response.data.team
          return {teammates: teammates, team: team};
          })
        .catch((error) => {
          console.log(error);
          return  {teammates: [], team: null};;
        });
    }
    findByLogin(login: string){
      return axios.get(API_URL + "find-by-login/" + login)
      .then((response) => {
        console.log(response.data);
          const user : Client = response.data.user;
          const fullName : string = response.data.fullName;
          return {user: user, fullName: fullName};
        })
      .catch((error) => {
        console.log(error);
        return {user: null, fullName: null};
      });
    }

    findByPhone(phone: string){
      return axios.get(API_URL + "find-by-phone/" + phone)
      .then((response) => {
        console.log(response.data);
        const user : Client = response.data.user;
        const fullName : string = response.data.fullName;
        return {user: user, fullName: fullName};
      })
      .catch((error) => {
        console.log(error);
        return {user: null, fullName: null};
      });
    }

    changeIsTeammate(flag: boolean, mainUserId: number ){
      return axios.post(API_URL + "change-is-teammate", {flag: flag, userId: mainUserId}, {headers: authHeader()} )
      .then((response) => {
        console.log(response.data);
          const invites:InviteModel [] = response.data.invites;
          const teams: Team[] = response.data.teams;
          return {invites: invites, teams: teams};
        })
      .catch((error) => {
        console.log(error);
        return {invites: [], teams: []};
      });
    }

   kickTeammate(flag: boolean, userId: number ){
      return axios.post(API_URL + "kick-teammate", {flag: flag, userId: userId}, {headers: authHeader()} )
      .then((response) => {
        console.log(response.data);
          const  teammates: Teammate [] = response.data.teammates;
          return teammates;
        })
      .catch((error) => {
        console.log(error);
        return [];
      });
    }
    leaveTeam(flag: boolean, userId: number ){
      return axios.post(API_URL + "leave-team", {flag: flag, userId: userId}, {headers: authHeader()} )
      .then((response) => {
        console.log(response.data);
          const  teams: Team [] = response.data.teams;
          const teammates : Teammate [] = response.data.teammates;
          const invitesTeammates : Teammate [] = response.data.invitesTeammates;
          const team: Team = response.data.team;
          return {teams: teams, teammates: teammates, invitesTeammates: invitesTeammates, team: team};
        })
      .catch((error) => {
        console.log(error);
        return [];
      });
    }


    addTeammate(phone: string, login: string){
      return axios.get(API_URL + "add-teammate/"+phone+"/"+login, {headers: authHeader()})
      .then((response) => {
          const teammates: Teammate[] = response.data.teammates;
          const invitesTeammates: Teammate[] = response.data.invitesTeammates;
          return {teammates:teammates, invitesTeammates: invitesTeammates};
        })
      .catch((error) => {
        console.log(error);
        return {teammates:[], invitesTeammates: []};
      });
    }
}

export default new TeamService();