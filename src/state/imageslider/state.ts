import { randomSeedImageSrc } from "~/utils/utils"

export type ImageProps = {
	id: number
	src: string
}

export type ImageSliderStateType = {
	total_images: number
	visible_no_image: number
	current_imageId: number
	direction: string
	images: ImageProps[]
	back_images: ImageProps[]
}

export const initializeImageSliderState = () => {
	const totalImages = 8
	const visibleNoImage = 5

	const cid = getRandomArbitrary(1, totalImages + 1)
	const currentImageId = cid
	const startOfBackImage = (cid + (visibleNoImage - 1) / 2 + 1) % totalImages
	const backImageSize = totalImages - visibleNoImage

	// initialize circular image array using two array
	const imageTmp = []
	const backImgTmp = []
	for (let i = startOfBackImage; i < startOfBackImage + totalImages; i++) {
		const id = i % totalImages === 0 ? totalImages : i % totalImages
		const url = new URL(randomSeedImageSrc(`slider-${id}`), import.meta.url).href

		if (backImgTmp.length !== backImageSize) {
			backImgTmp.unshift({ id, src: url })
		} else {
			imageTmp.push({ id, src: url })
		}
	}

	return {
		totalImages,
		visibleNoImage,
		currentImageId,
		direction: "ltr",
		images: imageTmp,
		backImages: backImgTmp
	}
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min)
}
