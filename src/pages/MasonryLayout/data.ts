import { createRef } from "react"
import { idToSrc } from "./components/Header"
import imagesjson from "./images.json"

export default imagesjson.images.map(item => ({
	...item,
	src: idToSrc(item.id),
	ref: createRef<HTMLDivElement>()
}))
