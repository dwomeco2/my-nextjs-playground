import { useQueries, useQuery, type UseQueryResult } from "@tanstack/react-query"
import { fetchTopStories, queryItem } from "."
import { hackernewsParameters } from "../../state/hackernews/state"
import { type HackerNewsItemType } from "../../types/hackernews/zod.schema"

type UseContentQueryProps = {
	data: HackerNewsItemType
	page: number
}

export const useContentQuery = ({ data, page }: UseContentQueryProps) => {
	const originPostData = useItemQuery(data.id)

	const [totalPages, itemIds, kidsQueries] = useInfiniteItemQueries(
		page,
		hackernewsParameters.maxCommentsPerPage,
		data.kids
	)

	return { totalPages, originPostData, itemIds, kidsQueries }
}

type UseTopStoriesListProps = {
	page: number
}

export const useTopStoriesList = ({ page }: UseTopStoriesListProps) => {
	const topStoriesIdsQuery = useTopStoriesIdsQuery()

	const [totalPages, itemIds, topStoriesQueries] = useInfiniteItemQueries(
		page,
		hackernewsParameters.maxPageItems,
		topStoriesIdsQuery.data
	)

	return [totalPages, itemIds, topStoriesQueries] as UseInfiniteItemQueriesProps
}

const useTopStoriesIdsQuery = () =>
	useQuery({
		queryKey: ["topStories"],
		queryFn: fetchTopStories,
		cacheTime: 12 * 5 * 60 * 1000, // 1 hour
		staleTime: 6 * 5 * 60 * 1000 // 30 minutes
	})

const useItemQuery = (itemID: number, isSuspense = false) =>
	useQuery({
		queryKey: ["item", itemID],
		queryFn: async () => queryItem(itemID),
		cacheTime: 6 * 5 * 60 * 1000, // 30 minutes
		staleTime: 3 * 5 * 60 * 1000, // 15 minutes
		suspense: isSuspense,
		enabled: Boolean(itemID)
	})

export const useItemQueries = (itemIDs: number[] = []) =>
	useQueries({
		queries: itemIDs.map(itemID => ({
			queryKey: ["item", itemID],
			queryFn: async () => queryItem(itemID),
			cacheTime: 6 * 5 * 60 * 1000, // 30 minutes
			staleTime: 3 * 5 * 60 * 1000 // 15 minutes
		}))
	})

type UseInfiniteItemQueriesProps = [number, number[], Array<UseQueryResult<HackerNewsItemType>>]

const useInfiniteItemQueries = (currentPage: number, maxQueriesPerPage: number, itemIDs: number[] | undefined = []) => {
	const divisor = Math.floor(itemIDs.length / maxQueriesPerPage)
	const remainder = itemIDs.length % maxQueriesPerPage
	const totalPages = remainder === 0 ? divisor : divisor + 1

	let currentQueriesCount = maxQueriesPerPage
	if (currentPage > totalPages) {
		// Here when queries is undefined or ...
		currentQueriesCount = 0
	} else if (currentPage === totalPages) {
		currentQueriesCount = remainder
	}

	const paginatedItemIds = itemIDs.slice(0, (currentPage - 1) * maxQueriesPerPage + currentQueriesCount)

	return [totalPages, paginatedItemIds, useItemQueries(paginatedItemIds)] as UseInfiniteItemQueriesProps
}
