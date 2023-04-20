import { type RefObject } from "react"

type ImageType = {
	id: number
	h: string
	bg: string
	src: string
	innerRef: RefObject<HTMLDivElement>
}

export default ImageType
