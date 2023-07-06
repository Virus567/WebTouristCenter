export interface Hike {
	id: number
	startTime: string,
    finishTime: string,
    routeName: string,
	wayToTravel: string,
	peopleAmount:  number,
    companyName: string,
    status: string,
    isPhotograph: boolean
    users: {
        id: number,
        login: string,
        surname: string,
        name: string,
        middleName: string
    }[]
}