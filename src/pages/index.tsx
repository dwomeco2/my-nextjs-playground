import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { Suspense, useState, type Dispatch, type SetStateAction } from "react"
import PuffLoader from "~/components/PuffLoader"
import TagLabel from "~/components/TagLabel"
import GithubCorner from "../components/GithubCorner/index"
import layoutComponent from "../data/tabs"

const queryClient = new QueryClient()

type ImenuProps = {
	activeLayout: number
	setActiveLayout: Dispatch<SetStateAction<number>>
}
const Menu = (props: ImenuProps) => {
	const { activeLayout, setActiveLayout } = props

	return (
		<div className="masked-overflow no-scrollbar component-selector mb-6 flex w-full overflow-x-auto sm:mx-auto sm:w-[524px] md:w-[720px]">
			{layoutComponent.map(({ name }, index) => (
				<div
					key={name as string}
					className={`menu-text inline cursor-pointer select-none p-2 px-4 
                  ${activeLayout === index ? "border-b-2 border-solid border-b-red-500" : ""}
                `}
					onClick={(e: React.MouseEvent<HTMLDivElement>) => {
						const selfEl = e.target as HTMLDivElement
						selfEl.scrollIntoView({ behavior: "smooth", inline: "center" })
						setActiveLayout(index)
					}}
				>
					{name}
				</div>
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

const Home: NextPage = () => {
	const [activeLayout, setActiveLayout] = useState(0)

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
						<Menu activeLayout={activeLayout} setActiveLayout={setActiveLayout} />
						<div className="mt-4">
							<div className="mx-auto flex w-full justify-center md:w-10/12 xl:w-9/12">
								<div className="relative w-full">
									<TagLabel labels={layoutComponent[activeLayout]?.labels as readonly string[]} />
									<Suspense fallback={<PuffLoader />}>{layoutComponent[activeLayout]?.comp}</Suspense>
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

export default Home
