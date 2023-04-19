import Image from "next/image"
import React, { useEffect, useState } from "react"
import Header from "./components/Header"

import styles from "index.module.css"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { FixedLoader } from "./components/FixedLoader"
import ImageAtom from "./data"
import { useScrollToBottomListener } from "./hooks"
import { type ImageType } from "./types"
import { addFiveImage } from "./util"

const MasonryImage = (image: ImageType) => {
	const router = useRouter()

	const toggleDetail = (e: React.MouseEvent<HTMLElement>, image: ImageType) => {
		const imageDiv = e.currentTarget as HTMLDivElement
		void router.prefetch(`/MasonryLayout/images/${image.id}`).then(() => {
			if ("startViewTransition" in document) {
				imageDiv.style.zIndex = "10"

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				document.startViewTransition(async () => {
					await router.push(`/MasonryLayout/images/${image.id}`)
				})
			} else {
				void router.push(`/MasonryLayout/images/${image.id}`)
			}
		})
	}

	useEffect(() => {
		void router.prefetch(`/MasonryLayout/images/${image.id}`)
	}, [router, image.id])

	return (
		<div
			key={image.id}
			className="relative mb-2 cursor-pointer"
			style={{ viewTransitionName: `photo-${image.id}` }}
			onClick={e => toggleDetail(e, image)}
		>
			<Image
				src={image.src}
				alt="masonry image"
				width={0}
				height={0}
				sizes="100vw"
				style={{
					width: "100%",
					height: `${image.h}rem`,
					lineHeight: `${image.h}rem`,
					objectFit: "cover",
					overflow: "clip",
					mixBlendMode: "normal"
				}}
			/>
		</div>
	)
}

export default function MasonryLayout() {
	const [images, setImages] = useAtom(ImageAtom)
	// const [images, setImages] = useAnimatedImage(ImagesData)
	const loadingState = useState(false)

	const [isLoading] = loadingState

	const addFiveImageAction = () => addFiveImage({ loadingState, setImages })

	const scrollerRef = useScrollToBottomListener({ onBottomCallback: addFiveImageAction })

	return (
		<div>
			<Header addFiveImageAction={addFiveImageAction} setImages={setImages} />
			<div
				ref={scrollerRef}
				className="scroller no-scrollbar relative h-[40rem] w-full overflow-y-scroll rounded-md bg-gray-200 bg-opacity-10"
			>
				{isLoading && <FixedLoader />}
				<div
					className={`w-full columns-3 gap-2 gap-y-2 rounded-md p-6 hover:gap-y-8 sm:columns-4 ${
						isLoading ? "mt-[-3rem]" : ""
					}`}
				>
					{images.map((item, index) => (
						<MasonryImage key={index} {...item} />
					))}
				</div>
				<div className="flex h-[20px] w-full justify-center py-2">Reached Bottom</div>
			</div>
		</div>
	)
}
