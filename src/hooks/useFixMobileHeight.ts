import { useEffect } from "react"

const documentHeight = () => {
	const doc = document.documentElement
	doc.style.setProperty("--doc-height", `${window.innerHeight}px`)
}

function useFixMobileHeight() {
	useEffect(() => {
		documentHeight()
	}, [])
}
export default useFixMobileHeight
