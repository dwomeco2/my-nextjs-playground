import { type UseQueryResult } from "@tanstack/react-query"
import PuffLoader from "components/share/PuffLoader"
import { useAtomValue } from "jotai"
import { nanoid } from "nanoid"
import { Suspense, useState, type RefObject } from "react"
import { useBottomScrollListener } from "react-bottom-scroll-listener"
import { useContentQuery, useItemQueries } from "~/apis/hackernews/query"
import { hackernewsParameters } from "~/state/hackernews/state"
import { type HackerNewsItemType } from "~/types/hackernews/zod.schema"
import { timeAgo } from "~/utils/utils"

export default function HackerNewsStoryContent() {
	const [page, setPage] = useState(1)

	const data = useAtomValue(hackernewsParameters.hackerNewsStoryContentAtom)

	const { totalPages, originPostData, itemIds, kidsQueries } = useContentQuery({
		data,
		page
	})

	const scrollRef = useBottomScrollListener(
		() => {
			setPage(prev => (prev < totalPages ? prev + 1 : prev))
		},
		{
			offset: 20,
			debounce: 300,
			triggerOnNoScroll: true
		}
	)

	return (
		<div
			ref={scrollRef as RefObject<HTMLDivElement>}
			className="h-full overflow-y-scroll bg-gray-900 p-2 text-gray-200"
		>
			<div className="h-12">
				<StoryComment key={1} queryResult={originPostData} floor={1} />
				{kidsQueries.map((queryResult, index) => (
					<StoryComment key={itemIds[index]} queryResult={queryResult} floor={index + 2} />
				))}
			</div>
		</div>
	)
}

type StoryCommentProps = {
	queryResult: UseQueryResult<HackerNewsItemType>
	floor?: number
}

function StoryComment(props: StoryCommentProps) {
	const [loadChild, setLoadChild] = useState(false)
	const { queryResult, floor } = props

	if (queryResult.status === "loading") {
		return <PuffLoader />
	}

	if (queryResult.status === "error") {
		return <div>Error: {JSON.stringify(queryResult.error)}</div>
	}

	const { by, time, text, kids } = queryResult.data

	if (by === "") {
		return <div />
	}

	return (
		<div className="my-2 bg-gray-800 px-2 py-1 text-gray-200">
			<div className="flex">
				{floor ? <div>#{floor}&nbsp;</div> : <div />}
				<div className="text-blue-400">{by}</div>&nbsp;
				<div>{timeAgo(time)}</div>
				<div>
					{floor !== 1 && kids && kids.length > 0 && (
						<button
							type="button"
							className="px-2"
							onClick={() => {
								setLoadChild(!loadChild)
							}}
						>
							&nbsp;▾
						</button>
					)}
				</div>
			</div>
			<div>
				<div
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: text }}
					className="mb-3 text-left"
				/>
				<div className="pl-4">
					{floor !== 1 && (
						<Suspense fallback={<PuffLoader />}>{loadChild && <StoryCommentChildren kids={kids} />}</Suspense>
					)}
				</div>
			</div>
		</div>
	)
}

function StoryCommentChildren({ kids }: { kids: number[] }) {
	const childQueries = useItemQueries(kids)
	return (
		<>
			{childQueries.map(childQueryResult => (
				<StoryComment key={nanoid()} queryResult={childQueryResult} />
			))}
		</>
	)
}
