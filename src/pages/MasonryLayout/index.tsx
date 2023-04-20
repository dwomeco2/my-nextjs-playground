import Image from "next/image"
import React, { useEffect } from "react"

import FixedLoader from "components/pages/masonry/FixedLoader"
import Header from "components/pages/masonry/Header"
import { useAtomValue, useSetAtom } from "jotai"
import { useRouter } from "next/router"
import { useAnimatedLayout } from "~/hooks/useAnimatedLayout"
import useScrollToBottomListener from "~/hooks/useScrollToBottomListener"
import { default as masonryState } from "~/state/masonry/state"
import type ImageType from "~/types/masonry/types"

const MasonryImage = (image: ImageType) => {
	const router = useRouter()

	const detailPath = `/MasonryLayout/images/${image.id}`

	const toggleDetail = (e: React.MouseEvent<HTMLElement>) => {
		const imageDiv = e.currentTarget as HTMLDivElement
		const scroller = document.querySelector(".scroller") as HTMLDivElement
		void router.prefetch(detailPath).then(() => {
			if ("startViewTransition" in document) {
				imageDiv.style.zIndex = "10"
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				imageDiv.style.viewTransitionName = "masonry-photo"
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				scroller.style.viewTransitionName = "masonry-frame"
				// modify to visible area would affect the layout

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				document.startViewTransition(async () => {
					await router.push(detailPath)
				})
			} else {
				void router.push(detailPath)
			}
		})
	}

	useEffect(() => {
		void router.prefetch(detailPath)
	}, [router, detailPath])

	return (
		<div
			ref={image.innerRef}
			className="relative mb-2 cursor-pointer"
			style={{
				height: `${image.h}px`,
				contain: "paint",
				objectFit: "cover",
				overflow: "clip",
				mixBlendMode: "normal"
			}}
			onClick={toggleDetail}
		>
			<Image
				src={image.src}
				alt="masonry image"
				width={0}
				height={0}
				sizes="100vw"
				style={{
					width: "100%",
					height: `${image.h}px`,
					objectFit: "cover",
					overflow: "clip"
				}}
			/>
		</div>
	)
}

export default function MasonryLayout() {
	const [loadingAtom, masonryAtom] = masonryState()
	const [imagesAtom, addMoreImagesAtom, suffleImagesAtom] = masonryAtom

	const addMoreImages = useSetAtom(addMoreImagesAtom)
	const suffleImages = useSetAtom(suffleImagesAtom)
	const isLoading = useAtomValue(loadingAtom)
	const images = useAtomValue(imagesAtom)

	useAnimatedLayout(images)

	const scrollerRef = useScrollToBottomListener({ onBottomCallback: addMoreImages })

	return (
		<div>
			<Header addFiveImageAction={addMoreImages} suffleImagesAction={suffleImages} />
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
				<div className="flex h-[20px] w-full justify-center py-2 text-white">Reached Bottom</div>
			</div>
		</div>
	)
}
