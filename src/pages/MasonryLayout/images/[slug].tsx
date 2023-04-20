import { useAtomValue } from "jotai"
import Image from "next/image"
import { useRouter } from "next/router"
import { default as masonryState } from "~/state/masonry/state"

export default function DetailImage() {
	const router = useRouter()

	const [, masonryAtom] = masonryState()
	const [imagesAtom] = masonryAtom

	const images = useAtomValue(imagesAtom)

	const { slug } = router.query

	const image = images.find(im => `${im.id}` === slug)

	if (!slug) {
		return <div>Image not found</div>
	}

	return (
		<div
			className="relative mt-[86px] flex h-[40rem] w-full items-center justify-center overflow-clip rounded-md"
			style={{ viewTransitionName: "masonry-frame" }}
			onClick={() => router.back()}
		>
			<div className="image_detail h-full w-full">
				{image && (
					<div
						key={image.id}
						className="relative cursor-pointer"
						style={{
							viewTransitionName: "masonry-photo",
							contain: "paint",
							height: "40rem",
							objectFit: "cover",
							overflow: "clip"
						}}
					>
						<Image src={image.src} alt="masonry image" fill style={{ objectFit: "cover" }} />
					</div>
				)}
			</div>
		</div>
	)
}
