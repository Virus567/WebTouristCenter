export interface Order {
	ID: number
	DateTime: string,
    RouteName: string,
	WayToTravel: string,
	TouristGroup: string,
	PeopleAmount:  number,
    ChildrenAmount:  number,
    ApplicationTypeName: string,
    Status: string,
    IsListParticipants: boolean
}