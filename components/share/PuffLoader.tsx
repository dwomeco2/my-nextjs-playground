import Image from "next/image"
import { type CSSProperties } from "react"

type PuffLoaderProps = {
	[key: string]: unknown
	style?: CSSProperties
	className?: string
}

export default function PuffLoader(props: PuffLoaderProps) {
	const { className, ...rest } = props
	return (
		<div className="relative h-full">
			<div
				className={`absolute-center-xy relative flex h-12 w-12 items-center justify-center ${className ?? ""} `}
				{...rest}
			>
				<Image src="puff.svg" alt="loader" fill className="object-cover" />
			</div>
		</div>
	)
}
