import {Route} from "../RoutesModel";
import {Instructor} from "../InstructorModel";
import {Teammate} from "../TeamModel";
import {Participant} from "../ParticipantModel";
export interface FinalOrderInfo {
	route: Route, 
    dateStart: string,
    dateFinish: string, 
    wayToTravel: string,
    isPhotograph: boolean,
    instructor: Instructor,
    peopleAmount: number,
    childrenAmount: number,
    teammates: Teammate[],
    participants: Participant[],
    allergyComment:string | null,
    equipmentComment: string | null,
    isDiabetic: boolean,
    isVegetarian: boolean,
    personalTent: number,
    hermeticBag: number
}