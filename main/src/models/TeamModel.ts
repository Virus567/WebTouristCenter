export interface Team {
	ID: number,
    Name: string,
    MainUser: {
        ID: number,
        Login: string,
        Surname: string,
        Name: string,
        MiddleName: string
     },
     Teammates: Teammate[]
}

export interface Teammate {
    ID: number,
    User:{
        ID: number,
        Login: string,
        Surname: string,
        Name: string,
        MiddleName: string,
    }
    IsActive: boolean

}

export interface InviteModel {
    MainUser: {
        ID: number,
        Login: string,
        Surname: string,
        Name: string,
        MiddleName: string
    }
    User: {
        ID: number,
        Login: string,
        Surname: string,
        Name: string,
        MiddleName: string
    }
	
}