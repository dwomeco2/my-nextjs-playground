export function randomSeedImageSrc(seed: string, w?: number, h?: number) {
	return `https://picsum.photos/seed/${seed}/${w ?? 2000}/${h ?? 2000}`
}
