import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Instructor} from "../../models/InstructorModel";

const API_URL = "http://localhost:8080/instructors/";

class InstructorService {
    getInstructors() {
		return axios.get(API_URL + "get")
        .then((response) => {
            console.log(response.data);
            const data: Answer = response.data;
            if(data.status){
               const instructors: Instructor[] = data.answer.instructors
               return instructors;
            }
            return [];
          })
          .catch((error) => {
            console.log(error);
            return [];
          });
    }
}
export default new InstructorService();