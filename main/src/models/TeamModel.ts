export interface Team {
	id: number,
    name: string,
    mainUser: {
        id: number,
        login: string,
        surname: string,
        name: string,
        middleName: string
     },
     teammates: Teammate[]
}

export interface Teammate {
    id: number,
    user:{
        id: number,
        login: string,
        surname: string,
        name: string,
        middleName: string,
    }
    isActive: boolean

}

export interface InviteModel {
    mainUser: {
        id: number,
        login: string,
        surname: string,
        name: string,
        middleName: string
    }
    user: {
        id: number,
        login: string,
        surname: string,
        name: string,
        middleName: string
    }
	
}