export interface Order {
	id: number
	startTime: string,
    finishTime: string,
    routeName: string,
	wayToTravel: string,
	touristGroup: string,
	peopleAmount:  number,
    childrenAmount:  number,
    applicationTypeName: string,
    status: string,
    isListParticipants: boolean,
    users: {
        id: number,
        login: string,
        surname: string,
        name: string,
        middleName: string
    }[]

}