import {z} from 'zod';

const cordinateZod = z.object({
	row: z.number().max(3),
	col: z.number().max(3),
});

const cellZ = z.object({
	id: z.string(),
	val: z.number().default(0),
	cor: cordinateZod,
	prevCor: cordinateZod.optional(),
});

export const cellsZod = z.array(cellZ);
export type CellsType = z.infer<typeof cellsZod>;

export enum Direction {
	Left = 1,
	Right,
	Up,
	Down,
}
