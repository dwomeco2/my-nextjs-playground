import { useEffect, useRef } from "react"

type useScrollToBottomListenerProp = {
	onBottomCallback: () => void
}

const useScrollToBottomListener = (props: useScrollToBottomListenerProp) => {
	const { onBottomCallback } = props
	const scrollerRef = useRef(null)

	useEffect(() => {
		if (!scrollerRef.current) {
			return
		}

		const scroller = scrollerRef.current as HTMLElement
		const obCallback = (entries: IntersectionObserverEntry[]) => {
			if (!scroller || scroller.scrollHeight <= scroller.clientHeight) {
				return
			}

			for (const e of entries) {
				if (e.isIntersecting) {
					// Scrolled to bottom
					// This could potentially replaced by useEffectEvent which is an experienmental API in React 18
					// Or use reducer for managing the state and dispatch an event here
					onBottomCallback()
				}
			}
		}

		const ob = new IntersectionObserver(obCallback, {
			root: scroller,
			threshold: 0
		})

		ob?.observe(scroller.lastChild as HTMLElement)
		return () => {
			ob?.unobserve(scroller.lastChild as HTMLElement)
			ob?.disconnect()
		}
	}, [onBottomCallback])

	return scrollerRef
}

export default useScrollToBottomListener
