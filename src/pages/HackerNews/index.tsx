import HackerNewsList from "components/pages/hackernews/HackerNewsListItem"
import HackerNewsStoryContent from "components/pages/hackernews/HackerNewsStoryContent"
import { useAtom } from "jotai"
import { hackernewsParameters } from "src/state/hackernews/state"
import styles from "./index.module.css"

export default function HackerNews() {
	const [sidebarOpen, toggleSideBar] = useAtom(hackernewsParameters.toggleSideBarAtom)

	return (
		<div>
			<div className="mb-2 w-full">
				<div
					className="cursor-pointer select-none rounded-md border-2 border-solid border-violet-500 bg-transparent px-2 py-2 text-center text-white"
					onClick={() => toggleSideBar()}
				>
					Toggle Sidebar
				</div>
			</div>
			<div className="relative flex h-screen w-full overflow-hidden">
				<div className={`shrink-0 ${sidebarOpen ? "" : "absolute left-[-100%]"} ${styles.sideBarList ?? ""} h-full`}>
					<HackerNewsList />
				</div>
				<div className="w-full grow">
					<HackerNewsStoryContent />
				</div>
			</div>
		</div>
	)
}
