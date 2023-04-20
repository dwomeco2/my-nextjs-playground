import Accordion from "components/pages/profile/Accordion"
import ShareCard from "components/pages/profile/ShareContentCard"
import PuffLoader from "components/share/PuffLoader"
import Image from "next/image"
import { Suspense } from "react"
import { randomSeedImageSrc } from "~/utils/utils"

function ProfileCardComponent() {
	const imageSrc = randomSeedImageSrc("profile")
	return (
		<div className="pd-4 flex h-80 w-64 flex-col overflow-clip rounded-lg bg-white shadow-md shadow-gray-400">
			<div>
				<figure className="relative h-32 bg-[#2f4f4f]">
					<Suspense
						fallback={
							<div className="flex h-32 w-full items-center justify-center">
								<PuffLoader />
							</div>
						}
					>
						<Image alt="profile background" src={imageSrc} fill className="object-cover" />
					</Suspense>
				</figure>
			</div>
			<div className="relative flex-1">
				<Image
					src="https://picsum.photos/50/50"
					width="50"
					height="50"
					alt="profile icon"
					className="absolute left-[calc(50%_-_25px)] top-[calc(-25px)] rounded-full outline outline-4 outline-offset-0 outline-white"
				/>
				<div className="my-4 ml-4 mt-12 items-center">
					<div>
						<span className="text-xl font-bold">Victor Crest &nbsp;</span>
						<span>26</span>
					</div>
					<span className="text-xs font-light">London</span>
				</div>
			</div>
			<hr />
			<div className="mt-2 flex w-full justify-evenly pb-2 text-center">
				<div className="my-auto w-[calc(30%_-_2px)]">
					<div className="flex flex-col">
						<div className="font-bold">80K</div>
						<span className="text-xs">Followers</span>
					</div>
				</div>
				<div className="my-auto w-[calc(30%_-_2px)]">
					<div className="flex flex-col">
						<div className="font-bold">803K</div>
						<span className="text-xs">Likes</span>
					</div>
				</div>
				<div className="my-auto w-[calc(30%_-_2px)]">
					<div className="flex flex-col">
						<div className="font-bold">1.4K</div>
						<span className="text-xs">Photos</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function ProfileCard() {
	return (
		<div className="flex flex-col items-center justify-center gap-8 text-[var(--colar-teal-12)]">
			<ProfileCardComponent />
			<ShareCard />
			<Accordion />
		</div>
	)
}
