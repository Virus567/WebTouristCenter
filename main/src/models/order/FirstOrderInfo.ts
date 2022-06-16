import {Route} from "../RoutesModel";
export interface FirsOrderInfo {
	route: Route, 
    dateStart: string,
    dateFinish: string, 
    wayToTravel: string,
    isPhotograph: boolean
}