import PuffLoader from "components/share/PuffLoader"
import Image from "next/image"
import { Suspense, useState } from "react"
import { randomSeedImageSrc } from "~/utils/utils"
import styles from "./index.module.css"

export default function PreviewCardComponent() {
	const [onOpen, setOnOpen] = useState(false)
	return (
		<div className="relative mb-8 w-full">
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(18rem,_1fr))] place-items-center gap-4">
				{[1, 2, 3, 4, 5, 6].map(n => {
					const src = randomSeedImageSrc(`preview-${n}`, 288, 208)
					return (
						<div
							key={n}
							className={`h-128 w-72 overflow-clip rounded-lg bg-gray-800 bg-opacity-90 py-2 text-white ${
								styles.card_hover_shadow ?? ""
							} cursor-pointer`}
							onClick={() => {
								if (window.innerWidth < 800) {
									return
								}

								setOnOpen(!onOpen)
							}}
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
							<figure className="relative h-52 bg-[#2f4f4f]">
								<Suspense
									fallback={
										<div className="flex h-52 w-full items-center justify-center">
											<PuffLoader />
										</div>
									}
								>
									<Image className="object-cover" alt="preview images" src={src} fill />
								</Suspense>
							</figure>
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
			{onOpen && (
				<div className="absolute-center-xy no-scrollbar rounded-md bg-[var(--colar-gray-2)] p-2 font-medium text-[var(--colar-gray-2)]">
					<div className={`${styles["preview-content-grid"] ?? ""} no-scrollbar h-full w-full`}>
						<div className="text-md inline text-start">
							<p className="inline text-9xl">Lorem</p>
						</div>
						<div className="inline text-end">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere aperiam rem veritatis, quaerat commodi
							vero possimus earum libero sit dicta facilis maiores fuga esse doloremque, iste adipisci similique nisi
							exercitationem. Architecto illo neque doloremque voluptate eos quos velit, placeat, iure asperiores
							sapiente necessitatibus tenetur ut? Nobis quibusdam aliquam sunt sed? Distinctio error dolorum laboriosam,
							numquam pariatur minima esse nam atque.
						</div>
						<div />
						<div />
						<div />
						<Image
							src="https://drscdn.500px.org/photo/1065848031/m%3D900/v2?sig=96566069619888852891868ed7ca49bdca25190570fec7866f32ce333ab1c737"
							alt="Sunset on Grand Canal  by Tommaso  Pessotto on 500px.com"
						/>
					</div>
					<div
						className="absolute right-10 top-4 h-4 w-4"
						onClick={() => {
							setOnOpen(false)
						}}
					>
						Close
					</div>
				</div>
			)}
		</div>
	)
}
