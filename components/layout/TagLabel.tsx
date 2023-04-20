type TagLabelProps = {
	labels: readonly string[]
}

const labelColors = [
	"bg-[var(--colar-red-5)]",
	"bg-[var(--colar-pink-5)]",
	"bg-[var(--colar-violet-5)]",
	"bg-[var(--colar-indigo-5)]",
	"bg-[var(--colar-cyan-5)]",
	"bg-[var(--colar-green-5)]",
	"bg-[var(--colar-lime-5)]",
	"bg-[var(--colar-yellow-5)]",
	"bg-[var(--colar-choco-5)]",
	"bg-[var(--colar-sand-5)]"
]

export default function TagLabel(props: TagLabelProps) {
	const { labels } = props
	return (
		<div className="mb-2 flex flex-wrap items-center justify-center gap-2">
			{labels.map((label, index) => {
				const colorClass = labelColors[index % labelColors.length] ?? ""
				return (
					<span key={label} className={`${colorClass} rounded-full px-2 py-1 text-xs text-white`}>
						#{label}
					</span>
				)
			})}
		</div>
	)
}
