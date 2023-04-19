import { useAtomValue } from "jotai"
import Image from "next/image"
import { useRouter } from "next/router"
import imagesAtom from "~/data/masonry/data"

export default function DetailImage() {
	const router = useRouter()

	const images = useAtomValue(imagesAtom)

	const { slug } = router.query

	const image = images.find(im => `${im.id}` === slug)

	if (!slug) {
		return <div>Image not found</div>
	}

	return (
		<div className="relative m-12 flex h-screen items-center justify-center" onClick={() => router.back()}>
			<div className="image_detail h-full w-full">
				{image && (
					<div
						key={image.id}
						className="relative cursor-pointer"
						style={{ viewTransitionName: `photo-${image.id}`, height: "100%" }}
					>
						<Image src={image.src} alt="masonry image" fill style={{ objectFit: "cover" }} />
					</div>
				)}
			</div>
		</div>
	)
}
