import { useEffect, useState, type RefObject } from "react"

type ImageBoundingRect = { ref: React.RefObject<HTMLDivElement>; br: DOMRect | undefined }

type useAnimatedType = {
	innerRef: RefObject<HTMLDivElement>
}
export function useAnimatedLayout(images: useAnimatedType[]): void {
	const [domRects, setDomRects] = useState<ImageBoundingRect[]>()

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const dr = images.map(item => ({ ref: item.innerRef, br: item.innerRef.current?.getBoundingClientRect() }))

		if (domRects && dr) {
			domRects.forEach(oldItem => {
				if (!oldItem.br) return
				const newItem = dr.find(item => item.ref.current === oldItem.ref.current)
				if (newItem && newItem.br) {
					const domNode = newItem.ref.current
					const deltaX = oldItem.br.left - newItem.br.left
					const deltaY = oldItem.br.top - newItem.br.top

					if (domNode && (deltaX !== 0 || deltaY !== 0)) {
						domNode.style.transform = `translate(${deltaX}px, ${deltaY}px)`
						domNode.style.transition = "transform 0s"
						requestAnimationFrame(() => {
							// In order to get the animation to play, we'll need to wait for
							// the 'invert' animation frame to finish, so that its inverted
							// position has propagated to the DOM.
							//
							// Then, we just remove the transform, reverting it to its natural
							// state, and apply a transition so it does so smoothly.
							domNode.style.transform = ""
							domNode.style.transition = "transform 500ms"
						})
					}
				}
			})
		}
	}, [images, domRects])

	useEffect(() => {
		if (images.every(item => item.innerRef.current)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const dr = images.map(item => ({ ref: item.innerRef, br: item.innerRef.current?.getBoundingClientRect() }))
			setDomRects(dr)
		}
	}, [images])
}
