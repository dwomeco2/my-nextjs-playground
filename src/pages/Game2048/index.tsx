import styles from "./index.module.css"

import { animated, useSpring } from "@react-spring/web"
import { type CSSProperties } from "react"
import { useSwipeable } from "react-swipeable"
import { WithClientOnly } from "~/hooks/ClientOnly"
import { useDelayedState } from "~/hooks/useDelayedState"
import { useGlobalKeyDownEffect } from "~/hooks/useGlobalKeyDown"
import { useMediaQuery } from "~/hooks/useMediaQuery"
import { Direction } from "~/state/game2048/types"
import { use2048Reducer, useIsGameEnd, type ActionType } from "../../state/game2048/backend"

const colors = [
	"#392A1A",
	"#473616",
	"#7f410b",
	"#8D3608",
	"#912107",
	"#A62507",
	"#4E3E0A",
	"#69530C",
	"#715A0C",
	"#EDC53F",
	"#EEC12E"
]

type CellNumberProps = {
	val: string
}

function CellNumber(props: CellNumberProps) {
	const { val } = props
	const [prevVal, setPrevVal] = useDelayedState(val)

	if (Boolean(val) && !prevVal) {
		// Spawn
		setPrevVal(val)
	} else if (val !== prevVal) {
		// Merge
		setPrevVal(val, 60)
	}

	return <div className="text-white">{prevVal}</div>
}

type CellProps = {
	[x: string]: unknown
	cor: {
		row: number
		col: number
	}
	prevCor?: {
		row: number
		col: number
	}
	children?: React.ReactNode
}

function Cell(props: CellProps) {
	const { cor, prevCor, children, style, className, ...rest } = props

	const mediaMatches = useMediaQuery("(min-width: 640px)")

	const cellSize = (index: number) => (mediaMatches ? 8 : 4) + (mediaMatches ? 118 : 76.75) * index

	const newTop = cellSize(cor.row)
	const newLeft = cellSize(cor.col)
	const springProps = useSpring({
		from: {
			top: cellSize(prevCor?.row ?? cor.row),
			left: cellSize(prevCor?.col ?? cor.col)
		},
		to: {
			top: newTop,
			left: newLeft
		},
		config: {
			tension: 210,
			friction: 22,
			precision: 0.01,
			mass: 1
		}
	})

	const posProps = prevCor ? springProps : { top: `${newTop}px`, left: `${newLeft}px` }

	return (
		<animated.div
			className={`absolute flex h-[72.75px] w-[72.75px] select-none items-center justify-center border border-solid border-emerald-200 sm:h-[110px] sm:w-[110px] ${
				className as string
			}`}
			style={{
				...(style as CSSProperties),
				...posProps
			}}
			{...rest}
		>
			{children}
		</animated.div>
	)
}

function EndToast({ isEnd, dispatch }: { isEnd: boolean; dispatch: (action: ActionType) => void }) {
	const isEndStyle = isEnd ? styles["end-toast"] : ""
	return (
		<div
			className={`${
				isEndStyle ?? ""
			} absolute left-1/2 top-1/2 z-10 flex h-36 w-64 flex-col items-center justify-center gap-6 rounded-md bg-gray-300 bg-opacity-75 p-2 text-gray-800 shadow-md shadow-gray-800 `}
		>
			<div className="select-none font-bold">End of game</div>
			<button
				type="button"
				className="cbtn cbtn-primary cbtn-invert cursor-pointer font-medium"
				onClick={() => {
					dispatch({ type: "restart" } as ActionType)
				}}
			>
				Restart
			</button>
		</div>
	)
}

function Game2048() {
	const [cells, dispatch] = use2048Reducer()
	const isEnd = useIsGameEnd()

	const swipeHandlers = useRegisterControlInterface(dispatch)

	return (
		<div className="relative">
			<div className="px-4 py-2 text-center text-sm font-semibold text-white">
				Canvas-less created in react & css animation
			</div>
			<div
				{...swipeHandlers}
				className="relative mx-auto aspect-square w-[311px] rounded-md bg-slate-800 bg-opacity-50 p-1 sm:h-[480px] sm:w-[480px] sm:p-2"
			>
				{cells.map(cell => {
					const val = cell.val !== 0 ? String(cell.val) : ""
					const backgroundColor = Number(cell.val) === 0 ? "" : colors[Math.log2(Number(cell.val))]
					return (
						<Cell
							key={cell.id}
							className={`text-xl font-extrabold sm:text-4xl ${styles["cell-animation"] ?? ""} ${
								cell.val !== 0 ? "z-10" : "z-0"
							} `}
							style={{
								backgroundColor: `${backgroundColor ?? ""}`
							}}
							cor={cell.cor}
							prevCor={cell.prevCor}
						>
							<div className="flex flex-col">
								<CellNumber val={val} />
							</div>
						</Cell>
					)
				})}
			</div>
			{isEnd && <EndToast isEnd={isEnd} dispatch={dispatch} />}
		</div>
	)
}
export default WithClientOnly(Game2048)

const useRegisterControlInterface = (dispatch: (action: ActionType) => void) => {
	useGlobalKeyDownEffect(
		["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"],
		[
			onArrowKeyDown(Direction.Right, dispatch),
			onArrowKeyDown(Direction.Left, dispatch),
			onArrowKeyDown(Direction.Up, dispatch),
			onArrowKeyDown(Direction.Down, dispatch)
		],
		[]
	)

	const swipeHandlers = useSwipeable({
		onSwipedRight: onArrowKeyDown(Direction.Right, dispatch),
		onSwipedLeft: onArrowKeyDown(Direction.Left, dispatch),
		onSwipedUp: onArrowKeyDown(Direction.Up, dispatch),
		onSwipedDown: onArrowKeyDown(Direction.Down, dispatch)
	})

	return swipeHandlers
}

function onArrowKeyDown(direction: ActionType["payload"]["direction"], dispatch: React.Dispatch<ActionType>) {
	return () => {
		dispatch({ type: "arrowkey", payload: { direction } })
	}
}
