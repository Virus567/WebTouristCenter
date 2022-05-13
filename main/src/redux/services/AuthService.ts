import axios from "axios";
import {Answer, LoginModel, RegistrationModel} from "../../models/RequestModels";
import {removeCookie, setCookie} from "typescript-cookie";
import {clientActions, State} from '../slices/clientSlice'
 import { RegisterFail,  LoginFail,} from "../actions/authActions"
import {Client} from "../../models/ClientModel";
const API_URL = "http://localhost:8080/auth/"

class AuthService {
	register(reg: RegistrationModel) {
		return axios.post(API_URL + "signon", reg)
			.then((res) => {
				const data: Answer = res.data;
				if (data.status) {
					setCookie("access_token", data.answer.access_token, {expires: 1, path: ''});
					const client: Client = data.answer.user;
					localStorage.setItem('user', JSON.stringify(client))
					return clientActions.registerSuccess({isAuth: true, client: client});;
				}
				return RegisterFail(data.errorText!);
			}).catch((err) => {
				return RegisterFail(err);
			})
	}

	login(login: LoginModel) {
		return axios.post(API_URL + "signin", login).then(
			(res) => {
				const data: Answer = res.data;
				if (data.status) {
					setCookie("access_token", data.answer.access_token, {expires: 1, path: ''});
					const client: Client = data.answer.user;
					localStorage.setItem('user', JSON.stringify(client));
					return clientActions.loginSuccess({isAuth: true, client: client});;
				}
				return LoginFail(data.errorText!);
			}).catch((err) => {
			return LoginFail(err);
		})
	}
	logout(){
		removeCookie("access_token", {path: ''});
		localStorage.removeItem('user');
		return clientActions.logout();
	}
}

export default new AuthService();