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
