import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import GithubCorner from "./GithubCorner/index"
import TagLabel from "./TagLabel"
import layoutComponent from "./tabs"

const queryClient = new QueryClient()

const Menu = () => {
	const [activeLayout, setActiveLayout] = useState(0)

	const border = (index: number) => (activeLayout === index ? "border-b-2 border-solid border-b-red-500" : "")

	return (
		<div className="masked-overflow no-scrollbar component-selector mb-6 flex w-full overflow-x-auto sm:mx-auto sm:w-[524px] md:w-[720px]">
			{layoutComponent.map(({ name, pageName }, index) => (
				<Link
					key={name as string}
					href={`/${pageName}`}
					className={`menu-text inline cursor-pointer select-none p-2 px-4 ${border(index)}`}
					onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
						const selfEl = e.target as HTMLAnchorElement
						selfEl.scrollIntoView({ behavior: "smooth", inline: "center" })
						setActiveLayout(index)
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
		<div className="absolute -z-50 h-full w-full bg-gradient-to-br from-[#1c4543] to-[#362b3d]">
			<Image src="bg-pattern.svg" fill alt="bg-pattern" className="object-cover opacity-10" />
		</div>
	)
}

const Layout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const pathname = router.pathname.split("/")[1]
	const activeLayout = layoutComponent.find(c => c.pageName === pathname)

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
								<div className="relative w-full">
									<TagLabel labels={activeLayout?.labels as readonly string[]} />
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
