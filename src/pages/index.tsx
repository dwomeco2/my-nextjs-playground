import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Index() {
	const router = useRouter()
	useEffect(() => {
		void router.push("/Game2048")
	}, [router])

	return null
}
