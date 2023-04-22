import { useEffect, useRef, useState } from "react"

export const useDelayedState = <T>(initialState: T) => {
	const [state, setState] = useState(initialState)
	const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

	const setDelayedState = (update: T, delayms?: number) => {
		if (!delayms) {
			setState(update)
			return
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			setState(initialState)
		}, delayms)
	}

	useEffect(
		() => () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		},
		[state]
	)

	return [state, setDelayedState] as const
}
