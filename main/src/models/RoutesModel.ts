export interface Route {
	id: number
	name: string,
    numberDays: number,
	description: string,
	fullDescription: string,
	checkpointStart: {id: number, title: string, type: string},
    checkpointFinish: {id: number, title: string, type: string},
    river: string,
	images: string[]
}