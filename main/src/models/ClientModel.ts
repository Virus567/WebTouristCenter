export interface Client {
	id: number
	surname: string,
	name: string,
	middleName: string | null,
	email: string,
	phoneNumber: string,
	login: string,
	nameOfCompany: string | null
}