import { type ImageType } from "./types"

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
	const randomHeight = Math.floor(Math.random() * (18 - 8 + 1)) + 8
	const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
		Math.random() * 256
	)})`

	return {
		id,
		h: `${randomHeight}`,
		bg: randomColor,
		src: paramsToSrc(id, undefined, randomHeight * 16)
	}
}

export function paramsToSrc(id: number, w?: number, h?: number) {
	return `https://picsum.photos/seed/masonry-${id}/${w ?? 2000}/${h ?? 2000}`
}
