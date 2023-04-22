import prand from "pure-rand"

export function randomSeedImageSrc(seed: string, w?: number, h?: number) {
	return `https://picsum.photos/seed/${seed}/${w ?? 2000}/${h ?? 2000}`
}

// Expect the first argument is scrollable
export function elementScrollerOverlap(scroller: HTMLDivElement, element: HTMLDivElement) {
	const scrollTop = scroller.scrollTop
	const scrollBottom = scrollTop + scroller.clientHeight
	const elementTop = element.offsetTop
	const elementBottom = elementTop + element.clientHeight
	const scrollLeft = scroller.scrollLeft
	const scrollRight = scrollLeft + scroller.clientWidth
	const elementLeft = element.offsetLeft
	const elementRight = elementLeft + element.clientWidth

	if (elementTop < scrollTop) {
		return { fullyInView: false, top: scrollTop - elementTop }
	} else if (elementBottom > scrollBottom) {
		return { fullyInView: false, bottom: elementBottom - scrollBottom }
	}

	if (elementLeft < scrollLeft) {
		return { fullyInView: false, left: scrollLeft - elementLeft }
	} else if (elementRight > scrollRight) {
		return { fullyInView: false, right: elementRight - scrollRight }
	}

	return { fullyInView: true }
}

// consistent Server Client random number generation
// Object.freeze for singleton
const seed = Date.now() ^ (Math.random() * 0x100000000)

export const rng = prand.xoroshiro128plus(seed)

export function randomMinMax(min: number, max: number) {
	return prand.unsafeUniformIntDistribution(min, max, rng)
}

/* eslint-disable */
export const debounce = (fn: Function, ms: number) => {
	let timeoutId: ReturnType<typeof setTimeout>
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn.apply(this, args), ms)
	}
}

export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T

export const sattr = <T, K extends keyof NonNullable<T>, V extends NonNullable<T>[K]>(
	arr: Array<T>,
	index: number,
	attr: K,
	val: V
) => {
	const el = arr[index]
	if (el) {
		el[attr] = val as NonNullable<T>[K]
	}
}
