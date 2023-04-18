import Image from "next/image"
import { useRouter } from "next/router"
import { type GetStaticPaths, type GetStaticProps } from "next/types"
import ImagesData from "../data"
import { type ImageType } from "../types"

export default function DetailImage(image: ImageType) {
	const router = useRouter()

	return (
		<div className="relative m-12 flex h-screen items-center justify-center" onClick={() => router.back()}>
			<div className="image_detail h-full w-full">
				{image && (
					<div
						key={image.id}
						ref={image.ref}
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

export const getStaticProps: GetStaticProps = ({ params }) => {
	if (!params || !params.slug) {
		return {
			props: { error: true }
		}
	}
	const { slug } = params
	const image = ImagesData.find(image => `${image.id}` === slug)

	if (!image) {
		return {
			props: { error: true }
		}
	}

	return {
		props: image
	}
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: ImagesData.map(image => {
			return {
				params: {
					slug: `${image.id}`
				}
			}
		}),
		fallback: "blocking"
	}
}
