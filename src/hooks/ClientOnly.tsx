import React, { useEffect, useState, type ComponentType, type PropsWithChildren } from "react"

export default function ClientOnly(props: PropsWithChildren) {
	const { children, ...rest } = props
	const [hasMounted, setHasMounted] = useState(false)
	useEffect(() => {
		setHasMounted(true)
	}, [])
	if (!hasMounted) {
		return null
	}
	return <div {...rest}>{children}</div>
}

export const WithClientOnly = <T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) => {
	const Inner = (props: T) => {
		const [hasMounted, setHasMounted] = useState(false)

		useEffect(() => {
			setHasMounted(true)
		}, [])

		if (!hasMounted) {
			return null
		}

		return <Component {...props} />
	}

	return Inner
}
