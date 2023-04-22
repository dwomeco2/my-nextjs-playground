import { array as A, function as F } from "fp-ts"

import { atom, useAtom } from "jotai"
import { useReducerAtom } from "jotai/utils"
import { nanoid } from "nanoid"
import { deepClone, sattr } from "~/utils/utils"
import { atomWithToggle } from "../common/atomWIthToggle"
import { Direction, cellsZod, type CellsType } from "./types"
import { directionToSequence, equalityCompare, indexToRowCol } from "./utils"

const isEndAtom = atomWithToggle(false)
const isEndReadOnlyAtom = atom(get => get(isEndAtom))

export function useIsGameEnd() {
	const [isEnd] = useAtom(isEndReadOnlyAtom)
	return isEnd
}

const gameDataAtom = atom(initializeGame())

export function use2048Reducer() {
	const [, toggleEnd] = useAtom(isEndAtom)
	return useReducerAtom(gameDataAtom, (prevState: CellsType, action: ActionType) => {
		const newState = reducer(prevState, action)

		if (checkIfGameEnd(newState)) {
			toggleEnd(true)
		} else if (action.type === "restart") {
			toggleEnd(false)
		}

		return newState
	})
}

function cellAt(cells: CellsType, row: number, col: number) {
	return cells.find(cell => cell.cor.row === row && cell.cor.col === col)
}

function sequenceToCells(cells: CellsType, direction: Direction) {
	return F.pipe(
		direction,
		directionToSequence,
		A.map(indexToRowCol),
		A.map(({ row, col }) => cellAt(cells, row, col))
	)
}

// This function assumes there are no zero
function equalConsecutiveVal(cells: ReturnType<typeof sequenceToCells>) {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 3; j++) {
			const prev = cells[i * 4 + j]
			const curr = cells[i * 4 + j + 1]
			if (prev && curr && prev.val === curr.val) {
				return curr.val
			}
		}
	}

	return -1
}

const checkIfGameEnd = (cells: CellsType) => {
	// Game End Requirement:
	// 1. All cells is not zero
	// 2. No consecutive cells are equal value

	const hasCellZero = !cells.every(cell => cell.val !== 0)

	const horizontal = sequenceToCells(cells, Direction.Left)
	const vertical = sequenceToCells(cells, Direction.Up)

	const noConsecutiveSame = equalConsecutiveVal(horizontal) === -1 && equalConsecutiveVal(vertical) === -1

	return !hasCellZero && noConsecutiveSame
}

export type ActionType = {
	type: "arrowkey" | "restart"
	payload: {
		direction: Direction
	}
}

function reducer(state: CellsType, action: ActionType) {
	const cells = state
	if (action.type === "arrowkey") {
		// Preprocess
		const { direction } = action.payload
		const lines = A.chunksOf(4)(sequenceToCells(cells, direction))

		const result = filterNoChange(lines as CellsType[])
			.map(l => {
				const line = l.map(deepClone)
				line.forEach(cell => {
					if (cell.prevCor) {
						cell.prevCor = undefined
					}
				})
				return moveOrMerge(line)
			})
			.flat()

		if (result.length === 0) {
			return state
		}

		let newState = deepClone(state)
		result.forEach(({ merged, unmount }) => {
			// Merge
			merged.forEach(m => {
				const index = newState.findIndex(cell => cell.id === m.id)
				if (index !== -1) {
					newState[index] = m
				} else {
					newState.push(m)
				}
			})
			// Unmount
			unmount.forEach(id => {
				newState = newState.filter(cell => cell.id !== id)
			})
		})

		// Arrow key with no changes
		if (
			equalityCompare(state, newState, item => ({
				id: item.id,
				val: item.val,
				cor: item.cor
			}))
		) {
			return state
		}

		// Respawn
		if (newState.findIndex(cell => cell.val === 0) !== -1) {
			newState = spawn(newState)
		}

		return newState
	}

	if (action.type === "restart") {
		return initializeGame()
	}

	throw Error("Unknown action")
}

// Type MoveOrMergeReturnType = {
// 	merged: CellsType;
// 	unmount: string[];
// };

// Expecting all line move to the left
const moveOrMerge = (arr: CellsType) => {
	let unmount = [] as string[]
	let i = 0
	let j = 1
	while (i < 3) {
		if (j >= 4) {
			i++
			j = i + 1
			continue
		}

		const iEl = arr[i]
		const jEl = arr[j]
		if (iEl && jEl) {
			if (iEl.val === jEl.val && iEl.val !== 0) {
				// Merge
				jEl.prevCor = jEl.cor
				jEl.cor = iEl.cor
				jEl.val *= 2
				unmount.push(iEl.id)
				arr[i] = jEl
				arr[j] = { id: "tombstone", val: 0, cor: jEl.prevCor }
				i++
			} else if (iEl.val === 0 && jEl.val !== 0) {
				// Move
				jEl.prevCor = jEl.cor
				jEl.cor = iEl.cor
				unmount.push(iEl.id)
				arr[i] = jEl
				arr[j] = { id: "tombstone", val: 0, cor: jEl.prevCor }
			} else if (iEl.val !== jEl.val && jEl.val !== 0) {
				i++
				j = i + 1
				continue
			}
		}

		j++
	}

	// Replace all tombstone with new one
	arr.forEach(cell => {
		if (cell.id === "tombstone") {
			cell.id = nanoid()
		}
	})

	unmount = unmount.filter(id => !arr.find(cell => cell.id === id))

	return { merged: arr, unmount } as const
}

function arrTrailingZeroCount<T>(arr: T[]): number {
	let count = 0
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] === 0) {
			count++
		} else {
			break
		}
	}

	return count
}

const filterNoChange = (lines: CellsType[]) =>
	lines
		.filter(l => !l.every(cell => cell.val === 0))
		.filter(l => {
			const zeroCount = l.filter(cell => cell.val === 0).length
			const trailingZeroCount = arrTrailingZeroCount(l.map(cell => cell.val))
			const hasLeadingOrMiddleZero = zeroCount !== trailingZeroCount

			const consecutiveVal = equalConsecutiveVal(l)

			const wouldMove = hasLeadingOrMiddleZero || consecutiveVal > 0
			return wouldMove
		})

function initializeGame() {
	let arr = Array(16).fill(null)
	for (let i = 0; i < 16; i++) {
		const cell = {
			val: 0,
			cor: { row: Math.floor(i / 4), col: i % 4 },
			id: nanoid()
		}
		arr[i] = cell
	}

	arr = cellsZod.parse(arr)

	arr = spawn(arr as CellsType)
	arr = spawn(arr as CellsType)

	return arr as CellsType
}

function spawnVal() {
	return Math.random() <= 0.9 ? 2 : 4
}

function spawn(arr: CellsType) {
	let index
	do {
		index = Math.floor(Math.random() * 16)
	} while (arr[index]?.val !== 0)

	sattr(arr, index, "val", spawnVal())

	return arr
}
