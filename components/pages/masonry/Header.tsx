type HeaderProps = {
	addFiveImageAction: () => void
	suffleImagesAction: () => void
}

export default function Header(props: HeaderProps) {
	const { addFiveImageAction, suffleImagesAction } = props

	return (
		<div className="my-6 flex justify-center gap-x-4">
			<button type="button" className="cbtn cbtn-secondary" onClick={suffleImagesAction}>
				Shuffle
			</button>
			<button type="button" className="cbtn cbtn-primary" onClick={addFiveImageAction}>
				Add 5
			</button>
		</div>
	)
}
