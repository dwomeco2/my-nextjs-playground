import {Direction} from './types';

export const equalityCompare = <T>(a: T[], b: T[], mapFunc: (item: T) => unknown): boolean => {
	const aSubset = a.map(mapFunc);
	const bSubset = b.map(mapFunc);
	return JSON.stringify(aSubset) === JSON.stringify(bSubset);
};

export const indexToRowCol = (i: number) => ({
	row: Math.floor(i / 4),
	col: i % 4,
});

export const directionToSequence = (direction: Direction) => {
	switch (direction) {
		case Direction.Left:
			return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		case Direction.Right:
			return [3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8, 15, 14, 13, 12];
		case Direction.Up:
			return [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];
		case Direction.Down:
			return [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3];
		default:
			throw new Error('Unknown direction: ');
	}
};
