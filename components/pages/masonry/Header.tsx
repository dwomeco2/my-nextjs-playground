import type ImageType from "~/types/masonry/types"

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
