export interface Route {
	ID: number
	Name: string,
    NumberDays: number,
	Description: string,
	FullDescription: string,
	CheckpointStart: {ID: number, Title: string, Type: string},
    CheckpointFinish: {ID: number, Title: string, Type: string},
    River: string,
	Images: string[]
}