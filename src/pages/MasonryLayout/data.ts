import { atom } from "jotai"
import imagesjson from "./images.json"
import { paramsToSrc } from "./util"

const images = imagesjson.images.map(item => ({
	...item,
	src: paramsToSrc(item.id)
}))

const imagesAtom = atom(images)

export default imagesAtom
