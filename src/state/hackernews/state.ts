import { atom } from "jotai"
import { atomWithToggle } from "src/state/common/atomWIthToggle"
import { type HackerNewsItemType } from "src/types/hackernews/zod.schema"

export const hackernewsParameters = {
	maxPageItems: 9,
	maxCommentsPerPage: 20,
	hackerNewsStoryContentAtom: atom({} as HackerNewsItemType),
	toggleSideBarAtom: atomWithToggle(true)
}
