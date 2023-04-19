import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { type ImageType } from "./types"

// type ImageBoundingRect = { ref: React.RefObject<HTMLDivElement>; br: DOMRect }

// type AnimatedLayoutHookType = [ImageType[], Dispatch<SetStateAction<ImageType[]>>]

// export function useAnimatedImage(imagesProp: ImageType[] | undefined): AnimatedLayoutHookType {
// 	const [images, setImages] = useState<ImageType[]>(imagesProp ?? [])
// 	const [domRects, setDomRects] = useState<ImageBoundingRect[]>()

// 	useEffect(() => {
// 		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// 		const dr = images.map(item => ({ ref: item.ref, br: item.ref.current!.getBoundingClientRect() }))

// 		if (domRects && dr) {
// 			domRects.forEach(oldItem => {
// 				const newItem = dr.find(item => item.ref.current === oldItem.ref.current)
// 				if (newItem) {
// 					const domNode = newItem.ref.current
// 					const deltaX = oldItem.br.left - newItem.br.left
// 					const deltaY = oldItem.br.top - newItem.br.top

// 					if (domNode && (deltaX !== 0 || deltaY !== 0)) {
// 						domNode.style.transform = `translate(${deltaX}px, ${deltaY}px)`
// 						domNode.style.transition = "transform 0s"
// 						requestAnimationFrame(() => {
// 							// In order to get the animation to play, we'll need to wait for
// 							// the 'invert' animation frame to finish, so that its inverted
// 							// position has propagated to the DOM.
// 							//
// 							// Then, we just remove the transform, reverting it to its natural
// 							// state, and apply a transition so it does so smoothly.
// 							domNode.style.transform = ""
// 							domNode.style.transition = "transform 500ms"
// 						})
// 					}
// 				}
// 			})
// 		}
// 	}, [images, domRects])

// 	useEffect(() => {
// 		if (images.every(item => item.ref.current)) {
// 			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// 			const dr = images.map(item => ({ ref: item.ref, br: item.ref.current!.getBoundingClientRect() }))
// 			setDomRects(dr)
// 		}
// 	}, [images])

// 	return [images, setImages]
// }

type useScrollToBottomListenerProp = {
	onBottomCallback: () => void
}

export const useScrollToBottomListener = (props: useScrollToBottomListenerProp) => {
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
