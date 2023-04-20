import { atom } from "jotai"
import { randomSeedImageSrc } from "~/utils/utils"

const data = [
	{ id: 0, h: "160", bg: "rgb(105, 64, 231)" },
	{ id: 1, h: "192", bg: "rgb(196, 178, 87)" },
	{ id: 2, h: "250", bg: "rgb(98, 187, 137)" },
	{ id: 3, h: "222", bg: "rgb(223, 19, 67)" },
	{ id: 4, h: "192", bg: "rgb(223, 125, 80)" },
	{ id: 5, h: "238", bg: "rgb(67, 240, 87)" },
	{ id: 6, h: "352", bg: "rgb(48, 199, 149)" },
	{ id: 7, h: "250", bg: "rgb(90, 113, 87)" },
	{ id: 8, h: "288", bg: "rgb(84, 222, 49)" },
	{ id: 9, h: "222", bg: "rgb(189, 44, 70)" }
]

const images = data.map(item => ({
	...item,
	src: randomSeedImageSrc(`masonry-${item.id}`)
}))

const imagesAtom = atom(images)

export default imagesAtom
