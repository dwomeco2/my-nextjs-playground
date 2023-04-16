import Image from "next/image"
import { createRef, useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { imageSources } from "../../data/ImageData"
import imagesjson from "./images.json"

type ImageType = {
	id: number
	h: string
	bg: string
	ref: React.RefObject<HTMLDivElement>
}

type ImageBoundingRect = { ref: React.RefObject<HTMLDivElement>; br: DOMRect }

type AnimatedLayoutHookType = [ImageType[], Dispatch<SetStateAction<ImageType[]>>]

function useAnimatedImage(imagesProp: ImageType[] | undefined): AnimatedLayoutHookType {
	const [images, setImages] = useState<ImageType[]>(imagesProp ?? [])
	const [domRects, setDomRects] = useState<ImageBoundingRect[]>()

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const dr = images.map(item => ({ ref: item.ref, br: item.ref.current!.getBoundingClientRect() }))

		if (domRects && dr) {
			domRects.forEach(oldItem => {
				const newItem = dr.find(item => item.ref.current === oldItem.ref.current)
				if (newItem) {
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
		if (images.every(item => item.ref.current)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const dr = images.map(item => ({ ref: item.ref, br: item.ref.current!.getBoundingClientRect() }))
			setDomRects(dr)
		}
	}, [images])

	return [images, setImages]
}

export default function MasonryLayout() {
	const [images, setImages] = useAnimatedImage(
		imagesjson.images.map(item => ({ ...item, ref: createRef<HTMLDivElement>() }))
	)
	const [isLoading, setIsLoading] = useState(false)

	const addFiveImage = useCallback(() => {
		if (isLoading) {
			return
		}

		setIsLoading(true)

		const maxId = Math.max(...images.map(item => item.id))
		const result: ImageType[] = []
		for (let i = 0; i < 5; i++) {
			result.push(addImage(maxId + i))
		}

		// Simulate 1 seconds delay
		setTimeout(() => {
			setIsLoading(false)
			setImages([...images, ...result])
		}, 1000)
	}, [images, isLoading, setImages])

	useEffect(() => {
		const scroller = document.querySelector(".scroller")
		const obCallback = (entries: IntersectionObserverEntry[]) => {
			if (!scroller || scroller.scrollHeight <= scroller.clientHeight) {
				return
			}

			for (const e of entries) {
				if (e.isIntersecting) {
					// Scrolled to bottom
					// This could potentially replaced by useEffectEvent which is an experienmental API in React 18
					// Or use reducer for managing the state and dispatch an event here
					addFiveImage()
				}
			}
		}

		const ob = new IntersectionObserver(obCallback, {
			root: scroller,
			threshold: 0
		})

		ob?.observe(scroller?.lastChild as HTMLElement)
		return () => {
			ob?.unobserve(scroller?.lastChild as HTMLElement)
			ob?.disconnect()
		}
	}, [images, isLoading, addFiveImage])

	return (
		<div>
			<div className="my-6 flex justify-center gap-x-4">
				<button
					type="button"
					className="cbtn cbtn-secondary"
					onClick={() => {
						setImages(randomize(images))
					}}
				>
					Shuffle
				</button>
				<button type="button" className="cbtn cbtn-primary" onClick={addFiveImage}>
					Add 5
				</button>
			</div>
			<div className="scroller no-scrollbar relative h-[40rem] w-full overflow-y-scroll rounded-md bg-gray-200 bg-opacity-10">
				{isLoading && (
					<div className="sticky top-0 z-20 h-12 w-full text-center text-lg font-bold leading-[3rem] text-white backdrop-blur">
						Loading
					</div>
				)}
				<div
					className={`scroller-item w-full columns-3 gap-2 rounded-md p-6 sm:columns-4 ${
						isLoading ? "mt-[-3rem]" : ""
					}`}
				>
					{images.map(item => {
						const src = `${imageSources[item.id % imageSources.length] ?? ""}?sig=masonry-${item.id}`
						return (
							<div
								key={item.id}
								ref={item.ref}
								className="relative mb-2 flex w-full cursor-pointer items-center justify-center hover:z-10 hover:scale-110"
							>
								<Image
									src={src}
									alt="masonry image"
									width={0}
									height={0}
									sizes="100vw"
									style={{ width: "100%", height: `${item.h}rem`, objectFit: "cover" }}
								/>
							</div>
						)
					})}
				</div>
				{/* We must do this because of animation of scroller-item may trigger intersection, h-0 would not trigger */}
				<div className="h-[1px] w-full" />
			</div>
		</div>
	)
}

function randomize(images: ImageType[]) {
	const newImages = [...images]

	for (let n = 0; n < newImages.length - 1; n++) {
		const k = n + Math.floor(Math.random() * (newImages.length - n))

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const temp = newImages.at(k)!
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		newImages[k] = newImages[n]!
		newImages[n] = temp
	}

	return newImages
}

function addImage(maxId: number) {
	const randomHeight = `${Math.floor(Math.random() * (18 - 8 + 1)) + 8}rem`
	const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
		Math.random() * 256
	)})`

	return {
		id: maxId + 1,
		h: randomHeight,
		bg: randomColor,
		ref: createRef<HTMLDivElement>()
	}
}
