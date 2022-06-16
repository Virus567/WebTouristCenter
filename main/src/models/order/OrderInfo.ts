import {Route} from "../RoutesModel";
import {Instructor} from "../InstructorModel";
import {Teammate} from "../TeamModel";
import {Participant} from "../ParticipantModel";
export interface OrderInfo {
	route: Route, 
    dateStart: string,
    dateFinish: string, 
    wayToTravel: string,
    isPhotograph: boolean,
    instructor: Instructor,
    peopleAmount: string,
    childrenAmount: string,
    teammates: Teammate[],
    participants: Participant[]
}