import { createRef } from "react"
import { imageSources } from "~/data/ImageData"
import { type ImageType } from "../types"

type HeaderProps = {
	addFiveImageAction: () => void
	setImages: React.Dispatch<React.SetStateAction<ImageType[]>>
}

export default function Header(props: HeaderProps) {
	const { addFiveImageAction, setImages } = props

	return (
		<div className="my-6 flex justify-center gap-x-4">
			<button type="button" className="cbtn cbtn-secondary" onClick={() => setImages(prev => randomize(prev))}>
				Shuffle
			</button>
			<button type="button" className="cbtn cbtn-primary" onClick={addFiveImageAction}>
				Add 5
			</button>
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

type AddFiveImageProps = {
	loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
	setImages: React.Dispatch<React.SetStateAction<ImageType[]>>
}

export const addFiveImage = (props: AddFiveImageProps) => {
	const { loadingState, setImages } = props
	const [isLoading, setIsLoading] = loadingState

	if (isLoading) {
		return
	}

	setIsLoading(true)

	// Simulate 1 seconds delay
	setTimeout(() => {
		setIsLoading(false)
		setImages(prev => {
			const maxId = Math.max(...prev.map(item => item.id))
			const result: ImageType[] = []
			for (let i = 1; i <= 5; i++) {
				result.push(addImage(maxId + i))
			}
			return [...prev, ...result]
		})
	}, 1000)
}

function addImage(id: number) {
	const randomHeight = `${Math.floor(Math.random() * (18 - 8 + 1)) + 8}`
	const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
		Math.random() * 256
	)})`

	return {
		id,
		h: randomHeight,
		bg: randomColor,
		src: idToSrc(id),
		ref: createRef<HTMLDivElement>()
	}
}

export function idToSrc(id: number) {
	return `${imageSources[id % imageSources.length] ?? ""}?sig=masonry-${id}`
}
