export interface Hike {
	ID: number
	StartTime: string,
    FinishTime: string,
    RouteName: string,
	WayToTravel: string,
	PeopleAmount:  number,
    CompanyName: string,
    Status: string,
    isPhotograph: boolean
    Users: { 
        ID: number,
        Login: string,
        Surname: string,
        Name: string,
        MiddleName: string
    }[]
}