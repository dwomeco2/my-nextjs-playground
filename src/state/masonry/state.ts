import { atom } from "jotai"
import prand from "pure-rand"
import { createRef } from "react"
import { randomSeedImageSrc, rng } from "~/utils/utils"

const images = [...Array(10).keys()].map(index => addImage(index))

const imagesAtom = atom(images)

const loadingAtom = atom(false)

const readonlyLoadingAtom = atom(get => get(loadingAtom))

const addMoreMasonryAtom = atom(null, (get, set) => {
	set(loadingAtom, true)
	// simulate loading delay
	setTimeout(() => {
		const prev = get(imagesAtom)
		const maxId = Math.max(...prev.map(item => item.id))
		const result = []
		for (let i = 1; i <= 5; i++) {
			result.push(addImage(maxId + i))
		}
		set(imagesAtom, [...prev, ...result])
		set(loadingAtom, false)
	}, 1000)
})

const suffleMasonryAtom = atom(null, (get, set) => {
	const prev = get(imagesAtom)
	set(imagesAtom, randomize(prev))
})

const readOnlyMasonryAtom = atom(get => get(imagesAtom))

export default function masonryState() {
	const masonryAtoms = [readOnlyMasonryAtom, addMoreMasonryAtom, suffleMasonryAtom] as const
	return [readonlyLoadingAtom, masonryAtoms] as const
}

// server and client side
function addImage(id: number) {
	const randomHeight = prand.unsafeUniformIntDistribution(128, 288, rng)
	const rColor = prand.unsafeUniformIntDistribution(0, 255, rng)
	const gColor = prand.unsafeUniformIntDistribution(0, 255, rng)
	const bColor = prand.unsafeUniformIntDistribution(0, 255, rng)

	const randomColor = `rgb(${rColor}, ${gColor}, ${bColor})`

	return {
		id,
		h: `${randomHeight}`,
		bg: randomColor,
		src: randomSeedImageSrc(`masonry-${id}`),
		innerRef: createRef<HTMLDivElement>()
	}
}

function randomize<T>(images: T[]) {
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
