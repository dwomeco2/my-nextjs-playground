import Image from "next/image"
import { cloneElement, useEffect, useState, type FunctionComponentElement } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { WithClientOnly } from "~/hooks/ClientOnly"
import { initializeImageSliderState } from "~/state/imageslider/state"

function ImageSlider() {
	const [imageSliderState, setImageSliderState] = useState(initializeImageSliderState())

	useEffect(() => {
		const resizeCallback = () => {
			const el = document.querySelector(".image_slide_item:nth-child(3)")
			if (el) {
				el.scrollIntoView({
					behavior: "auto",
					block: "center",
					inline: "center"
				})
			}
		}

		resizeCallback()

		window.addEventListener("resize", resizeCallback)
		return () => {
			window.removeEventListener("resize", resizeCallback)
		}
	}, [])

	if (!imageSliderState) {
		return <div>Loading...</div>
	}

	if (imageSliderState?.totalImages < imageSliderState?.visibleNoImage) {
		return <div>Not enought Images</div>
	}

	function next() {
		if (!imageSliderState) {
			return
		}

		setImageSliderState(prev => {
			if (prev) {
				const imageSliderState = prev
				const cid = (imageSliderState.currentImageId + 1) % imageSliderState.totalImages
				const newImages = imageSliderState.images
				const newBackImages = imageSliderState.backImages

				if (imageSliderState.backImages.length > 0 && imageSliderState.images.length > 0) {
					// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
					newImages.push(newBackImages.pop()!)
					// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
					newBackImages.unshift(newImages.shift()!)
				}

				return {
					...prev,
					direction: "rtl",
					currentImageId: cid,
					images: newImages,
					backImages: newBackImages
				}
			}

			return prev
		})
	}

	function before() {
		if (!imageSliderState) {
			return
		}

		setImageSliderState(prev => {
			if (prev) {
				const imageSliderState = prev
				const c = imageSliderState.currentImageId
				const t = imageSliderState.totalImages
				const newImages = imageSliderState.images
				const newBackImages = imageSliderState.backImages

				if (imageSliderState.backImages.length > 0 && imageSliderState.images.length > 0) {
					// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
					newBackImages.push(newImages.pop()!)
					// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
					newImages.unshift(newBackImages.shift()!)
				}

				return {
					...prev,
					direction: "ltr",
					currentImageId: c === t ? 1 : c + 1,
					images: newImages,
					backImages: newBackImages
				}
			}

			return prev
		})
	}

	return (
		<div className="relative mt-16 w-full">
			<div className="absolute-center-xy mt-[120px] flex w-[600px] scale-50 justify-center transition-all xs:scale-75 sm:w-[720px] sm:scale-100">
				<TransitionGroup
					className="image_slider no-scrollbar overflow-hidden"
					// The exiting component is already detached and therefore does not get any updates.
					// https://stackoverflow.com/questions/48655213/react-csstransition-wrong-class-used-on-exit
					childFactory={child =>
						cloneElement(child as FunctionComponentElement<{ classNames: string }>, {
							classNames: `${imageSliderState.direction}`
						})
					}
				>
					{imageSliderState.images.map((image, index) => {
						const { type, imageSize } = mapImageSliderStateStyle()
						const navOnClick = index === 1 ? before : index === 3 ? next : null
						const cursorPoint = index === 1 || index === 3 ? "cursor-pointer" : ""
						const hoverBrightness = index !== 2 ? "brightness-50 hover:brightness-100" : ""
						return (
							<CSSTransition
								key={image.id}
								timeout={200}
								classNames={`${imageSliderState.direction}`}
								addEndListener={() => {
									// Image.nodeRef.current?.classList.toggle(`${dir}`)
								}}
							>
								<div
									className={`image_slide_item ${type[index] ?? ""} ${cursorPoint} ${hoverBrightness}`}
									onClick={() => {
										if (navOnClick) {
											navOnClick()
										}
									}}
								>
									<Image src={image.src} alt="image" height={imageSize[index]} width={imageSize[index]} />
								</div>
							</CSSTransition>
						)
					})}
				</TransitionGroup>
				{/* Hidden class for tailwindcss to not remove it from bundle */}
				<div className="ltr-enter ltr-enter-active rtl-enter rtl-enter-active ltr-exit ltr-exit-active rtl-exit rtl-exit-active rtl-enter-done ltr-enter-done hidden" />
			</div>
			<div className="absolute-center-xy mt-[240px] flex justify-center gap-x-8 sm:mt-[300px]">
				<button
					type="button"
					className="cbtn cbtn-secondary"
					onClick={() => {
						before()
					}}
				>
					Prev
				</button>
				<button
					type="button"
					className="cbtn cbtn-primary"
					onClick={() => {
						next()
					}}
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default WithClientOnly(ImageSlider)

const mapImageSliderStateStyle = () => {
	const type = ["carousel-2", "carousel-1", "carousel0", "carousel1", "carousel2"]
	const imageSize = [150, 200, 250, 200, 150]
	return { type, imageSize }
}
