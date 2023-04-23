import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { isIOS, isSafari } from "react-device-detect"
import GithubCorner from "./GithubCorner/index"
import TagLabel from "./TagLabel"
import layoutComponent from "./tabs"

const queryClient = new QueryClient()

const Menu = () => {
	const router = useRouter()
	const [activeLayout, setActiveLayout] = useState(0)
	const [menuStyle, setMenuStyle] = useState("text-white")

	useEffect(() => {
		const pathname = router.pathname.split("/")[1]
		const activeLayoutIndex = layoutComponent.findIndex(c => c.pageName === pathname)
		setActiveLayout(activeLayoutIndex)
		const el = document.querySelector(`.menu-${activeLayout}`)
		if (el) {
			const selfEl = el as HTMLAnchorElement
			selfEl.scrollIntoView({ behavior: "smooth", inline: "center" })
		}
	}, [router, activeLayout])

	const border = (index: number) => (activeLayout === index ? "border-b-2 border-solid border-b-red-500" : "")

	const gradientMenu =
		"inline-block text-fill-transparent bg-gradient-to-r from-35% via-55% to-65% from-purple-500 via-amber-500 to-pink-500 bg-fixed bg-clip-text hover:brightness-125"

	const defaultMenu = "text-white"

	useEffect(() => {
		//only work when it is mounted
		setMenuStyle(isSafari || isIOS ? defaultMenu : gradientMenu)
	}, [])

	return (
		<div className="masked-overflow no-scrollbar component-selector mb-6 flex w-full overflow-x-auto sm:mx-auto sm:w-[524px] md:w-[720px]">
			{layoutComponent.map(({ name, pageName }, index) => (
				<Link
					key={name as string}
					href={`/${pageName ?? ""}`}
					className={`menu-${index} ${menuStyle} cursor-pointer select-none p-2 px-4 font-semibold text-white ${border(
						index
					)}`}
					onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
						e.preventDefault()
						const selfEl = e.target as HTMLAnchorElement
						selfEl.scrollIntoView({ behavior: "smooth", inline: "center" })
						setActiveLayout(index)
						if ("startViewTransition" in document) {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							document.startViewTransition(async () => {
								await router.push(selfEl.href)
							})
						} else {
							void router.push(selfEl.href)
						}
					}}
				>
					{name}
				</Link>
			))}
		</div>
	)
}

const Background = () => {
	return (
		<div className="background absolute -z-50 h-screen w-full bg-gradient-to-br from-[#1c4543] to-[#362b3d]">
			<Image src="bg-pattern.svg" fill alt="bg-pattern" className="object-cover opacity-10" />
		</div>
	)
}

const Layout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const pathname = router.pathname.split("/")[1]
	const activeLayout = layoutComponent.find(c => c.pageName === pathname)

	if (!activeLayout) {
		return <></>
	}

	return (
		<>
			<Head>
				<title>My Next.js app</title>
				<meta name="description" content="My Next.js app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<QueryClientProvider client={queryClient}>
				<main className="flex min-h-screen">
					<Background />
					<div className="no-scrollbar h-screen w-full overflow-y-scroll p-8">
						<Menu />
						<div className="mt-4">
							<div className="mx-auto flex w-full justify-center md:w-10/12 xl:w-9/12">
								<div className="relative w-full" style={{ viewTransitionName: "page" }}>
									<TagLabel labels={activeLayout.labels as readonly string[]} />
									{children}
								</div>
							</div>
						</div>
					</div>
				</main>
				<GithubCorner />
			</QueryClientProvider>
		</>
	)
}

export default Layout
