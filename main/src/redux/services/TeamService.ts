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
            const data: Answer = response.data;
            if(data.status){
              const teams: Team [] = data.answer.teams;
              const team: Team = data.answer.team;
              const teammates: Teammate [] = data.answer.teammates;
              const invitesTeammates: Teammate [] = data.answer.invitesTeammates;
              const invites: InviteModel [] = data.answer.invites;
              return {teams: teams, team:team, teammates: teammates, invites: invites, invitesTeammates: invitesTeammates};
            }
            return {teams: [], team: null, teammates: [], invites: [], invitesTeammates:[]};
            
          }) 
          .catch((error) => {
            console.log(error);
            return {teams: [], team: null, teammates: [], invites: [], invitesTeammates:[]};
          });
	  }

    changeTeamByTeamId(id: number){
      return axios.get(API_URL + "change-team?id=" + id)
      .then((response) => {
        
        const data: Answer = response.data;
        if(data.status){
          const teammates : Teammate [] = data.answer.teammates;
          const invitesTeammates : Teammate [] = data.answer.invitesTeammates;
          const team : Team = data.answer.team
          return {team:team, teammates: teammates, invitesTeammates: invitesTeammates};
        }
        else{
          return {team:[], teammates: [], invitesTeammates:[]};
        }
      })
      .catch((error) => {
        console.log(error);
        return {team:[], teammates: [], invitesTeammates:[]};
      });
    }

    getDefaultTeammatesByUser() {
      return axios.get(API_URL + "default-teammates", {headers: authHeader()})
        .then((response) => {
          
          const data: Answer = response.data;
          if(data.status){
          const teammates: Teammate[] = data.answer.teammates;
          const team: Team = data.answer.team
          return {teammates: teammates, team: team};
          }
          else{
            return {teammates: [], team: null};
          }
        })
        .catch((error) => {
          console.log(error);
          return  {teammates: [], team: null};;
        });
    }
    findByLogin(login: string){
      return axios.get(API_URL + "find-by-login?login=" + login)
      .then((response) => {
        console.log(response.data);
        const data: Answer = response.data;
        if(data.status){
          const user : Client = data.answer.user;
          const fullName : string = data.answer.fullName;
          return {user: user, fullName: fullName};
        }
        else{
          return {user: null, fullName: null};
        }
       
      })
      .catch((error) => {
        console.log(error);
        return {user: null, fullName: null};
      });
    }

    findByPhone(phone: string){
      return axios.get(API_URL + "find-by-phone?phone=" + phone)
      .then((response) => {
        console.log(response.data);
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

    changeIsTeammate(flag: boolean, mainUserId: number ){
      return axios.post(API_URL + "change-is-teammate", {flag: flag, userId: mainUserId}, {headers: authHeader()} )
      .then((response) => {
        console.log(response.data);
        const data: Answer = response.data;
        if(data.status){
          const invites:InviteModel [] = data.answer.invites;
          const teams: Team[] = data.answer.teams;
          return {invites: invites, teams: teams};
        }
        return {invites: [], teams: []};
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
        const data: Answer = response.data;
        if(data.status){
          const  teammates: Teammate [] = data.answer.teammates;
          return teammates;
        }
        return [];
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
    }


    addTeammate(phone: string, login: string){
      return axios.post(API_URL + "add-teammate?phone=" + phone + "&login="+ login, phone, {headers: authHeader()})
      .then((response) => {
        const data: Answer = response.data;
        if(data.status){
          const teammates: Teammate[] = data.answer.teammates;
          const invitesTeammates: Teammate[] = data.answer.invitesTeammates;
          return {data: data, teammates:teammates, invitesTeammates: invitesTeammates};
        }
        return {data: data, teammates:[], invitesTeammates: []};
      })
      .catch((error) => {
        console.log(error);
        const data: Answer = {status: false, answer: null, error: null, errorText: null}
        return {data:data, teammates:[], invitesTeammates: []};
      });
    }
}

export default new TeamService();