export interface Order {
	ID: number
	StartTime: string,
    FinishTime: string,
    RouteName: string,
	WayToTravel: string,
	TouristGroup: string,
	PeopleAmount:  number,
    ChildrenAmount:  number,
    ApplicationTypeName: string,
    Status: string,
    IsListParticipants: boolean,
    Users: { 
        ID: number,
        Login: string,
        Surname: string,
        Name: string,
        MiddleName: string
    }[]

}