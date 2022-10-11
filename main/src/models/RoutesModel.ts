export interface Route {
	id: number
	name: string,
    numberDays: number,
	description: string,
	fullDescription: string,
	checkpointStart: {ID: number, Title: string, Type: string},
    checkpointFinish: {ID: number, Title: string, Type: string},
    river: string,
	images: string[]
}