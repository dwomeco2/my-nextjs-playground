import { itemSchema, topStoriesSchema } from "../../types/hackernews/zod.schema"

export const fetchTopStories = async () => {
	const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
	if (res.status !== 200) {
		return Promise.reject(new Error(`Failed to fetch top stories res.status:${res.status}`))
	}

	return res.json().then(async json => {
		const safeParseResult = topStoriesSchema.safeParse(json)
		if (!safeParseResult.success) {
			return Promise.reject(new Error(`Failed to parse top stories json:${JSON.stringify(json)}`))
		}

		return safeParseResult.data
	})
}

export const queryItem = async (itemID: number) => {
	const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json`)
	if (res.status !== 200) {
		return Promise.reject(new Error(`Failed to fetch item ${itemID} res.status:${res.status}`))
	}

	return res.json().then(async json => {
		const safeParseResult = itemSchema.safeParse(json)
		if (!safeParseResult.success) {
			return Promise.reject(new Error(`Failed to parse item itemID:${itemID} json:${JSON.stringify(json)}`))
		}

		return safeParseResult.data
	})
}
