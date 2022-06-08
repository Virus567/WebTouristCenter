export interface Team {
	ID: number,
    Name: string,
    MainUser: {
        ID: number,
        Login: string,
        FullName: string,
     },
     Teammates: Teammate[]
}

export interface Teammate {
    ID: number,
    User:{
        Login: string,
        Surname: string,
        Name: string,
        PhoneNumber: string,
        MiddleName: string,
        Email: string
    }
    IsTeammate: boolean,
    IsActive: boolean

}

export interface InviteModel {
    MainUser: {
        ID: number,
        Login: string,
        FullName: string,
    }
    User: {
        ID: number,
        Login: string,
        FullName: string,
    }
	
}