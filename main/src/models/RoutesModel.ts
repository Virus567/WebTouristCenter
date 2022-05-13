export interface HikeRoute {
	ID: number
	Name: string,
    NumberDays: number,
	Description: string,
	CheckpointStart: {ID: number, Title: string, Type: string},
    CheckpointFinish: {ID: number, Title: string, Type: string},
    River: string
}