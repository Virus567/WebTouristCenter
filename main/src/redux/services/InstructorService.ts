import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Instructor} from "../../models/InstructorModel";

const API_URL = "http://localhost:8080/instructors/";

class InstructorService {
    getInstructors() {
		return axios.get(API_URL + "")
        .then((response) => {
            console.log(response.data);
              const instructors: Instructor[] = response.data.answer.instructors
              return instructors;
            })
          .catch((error) => {
            console.log(error);
            return [];
          });
    }
}
export default new InstructorService();