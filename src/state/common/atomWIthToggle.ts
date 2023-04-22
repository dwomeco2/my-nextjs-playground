import { atom } from "jotai"

export const atomWithToggle = (initialValue?: boolean) => {
	const booleanAtom = atom(initialValue ?? false, (get, set, update?: boolean) => {
		set(booleanAtom, update ?? !get(booleanAtom))
	})
	return booleanAtom
}
