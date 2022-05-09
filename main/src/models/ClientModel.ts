export interface Client {
	ID: number
	Surname: string,
	Name: string,
	Middlename: string | null,
	Email: string,
	PhoneNumber: string,
	Login: string,
	NameOfCompany: string | null
}