import Image from "next/image"
import { randomSeedImageSrc } from "~/utils/utils"
import styles from "./index.module.css"

export default function PreviewCardComponent() {
	return (
		<div className="relative my-8">
			<div className="flex flex-wrap place-items-center justify-center gap-4">
				{[1, 2, 3, 4, 5, 6].map(n => {
					const src = randomSeedImageSrc(`preview-${n}`, 288, 208)
					return (
						<div
							key={n}
							className={`flex w-72 flex-col overflow-clip rounded-lg bg-gray-800 bg-opacity-90 py-2 text-white ${
								styles.card_hover_shadow ?? ""
							} cursor-pointer`}
						>
							<div className="flex items-center px-2 pb-2">
								<Image
									src="https://picsum.photos/50/50"
									alt="icon"
									width="24"
									height="24"
									className="h-6 w-6 rounded-full"
									loading="lazy"
								/>
								<div className="ml-2 flex flex-1 flex-col text-start">
									<span className="text-sm font-semibold">Stuar Manson</span>
									<span className="text-xs">published 2 hours ago</span>
								</div>
								<button type="button">
									<span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											viewBox="0 0 16 16"
										>
											<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
										</svg>
									</span>
								</button>
							</div>
							{/* Weird bug, when ever h is set to some number, view transition will stretch the entire page */}
							<div className="relative h-52 bg-[#2f4f4f]">
								<Image className="object-cover" alt="preview images" src={src} width={288} height={208} />
							</div>
							<div className="p-2 text-start">
								<div className="mb-0 font-medium">Flores</div>
								<span className="text-xs font-light">by Stuar Manson</span>
								<p className="text-xs">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nihil aut sed facilis laudantium
									obcaecati architecto qui nobis impedit id commodi eveniet tempora asperiores sunt iste, ducimus
									reiciendis quae vitae?
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
