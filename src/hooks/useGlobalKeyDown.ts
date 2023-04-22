import { useEffect } from "react"

export const useGlobalKeyDownEffect = <T>(keys: string[], callbacks: Array<(deps: T[]) => void>, dependencies: T[]) => {
	const keyDownCallback = (e: KeyboardEvent) => {
		keys.forEach((key, index) => {
			if (e.key === key) {
				const el = callbacks[index]
				if (el) {
					el(dependencies)
				}
			}
		})
	}

	useEffect(() => {
		window.addEventListener("keydown", keyDownCallback)
		return () => {
			window.removeEventListener("keydown", keyDownCallback)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependencies])
}
