import { useRef } from "react"

import { FaFacebookSquare, FaGetPocket, FaInstagram, FaLinkedin, FaPinterestSquare, FaTwitter } from "react-icons/fa"

import styles from "./index.module.css"

const socialIcons = [
	{
		icon: <FaTwitter size="1.1rem" />,
		link: "https://twitter.com/",
		name: "twitter"
	},
	{
		icon: <FaFacebookSquare size="1.1rem" />,
		link: "https://facebook.com/",
		name: "facebook"
	},
	{
		icon: <FaInstagram size="1.1rem" />,
		link: "https://www.instagram.com/",
		name: "instagram"
	},
	{
		icon: <FaPinterestSquare size="1.1rem" />,
		link: "https://www.youtube.com/",
		name: "youtube"
	},
	{
		icon: <FaLinkedin size="1.1rem" />,
		link: "https://www.linkedin.com/",
		name: "linkedin"
	},
	{
		icon: <FaGetPocket size="1.1rem" />,
		link: "https://github.com/",
		name: "github"
	}
]

function SocialIconsList(): JSX.Element {
	return (
		<div className={`${styles["social-icons"] ?? ""} my-4 flex justify-between gap-2 text-sm`}>
			{socialIcons.map(({ icon, name }) => (
				<button
					key={name}
					name={name}
					type="button"
					className=" flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-white ring-black"
				>
					{icon}
				</button>
			))}
		</div>
	)
}

function CopyInput({ link, inputRef }: { link: string; inputRef: React.RefObject<HTMLInputElement> }): JSX.Element {
	return (
		<div className="flex rounded-md bg-gray-300 px-2 py-1 text-xs">
			<input ref={inputRef} readOnly type="text" value={link} className="grow bg-transparent outline-none" />
			<button
				type="button"
				className="pl-2 font-medium"
				onClick={() => void navigator.clipboard.writeText(inputRef.current?.value ?? "")}
			>
				Copy
			</button>
		</div>
	)
}

export default function ShareCard() {
	const inputRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>

	return (
		<div className="flex w-[300px] items-center justify-center overflow-hidden rounded-md transition-all">
			<div className="mx-auto w-full">
				<div className="h-full rounded-xl bg-gray-100 px-6 py-6 shadow-md shadow-gray-400 sm:px-8">
					<div className="text-sm font-bold">Share this challenge</div>
					<SocialIconsList />
					<div className="mb-2 text-xs">or copy link</div>
					<CopyInput link="https://www.copymehaha.com/aslkdowce" inputRef={inputRef} />
				</div>
			</div>
		</div>
	)
}
