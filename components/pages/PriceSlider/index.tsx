import { useEffect, useState } from "react"
import styles from "./index.module.css"

function Slider() {
	const [sliderProgress, setSliderProgress] = useState(30)

	useEffect(() => {
		const slider = document.querySelector(`.${styles["slider-bar"] ?? ""}`) as HTMLInputElement | undefined

		const min = Number(slider?.min ?? 0)
		const max = Number(slider?.max ?? 0)
		const val = Number(slider?.value ?? 0)

		if (slider) {
			slider.style.backgroundSize = `${((val - min) * 100) / (max - min)}% 100%`
		}
	}, [sliderProgress])

	return (
		<div className="relative mb-16 mt-12 h-1 w-full rounded-lg">
			<input
				min={0}
				max={100}
				type="range"
				className={`${styles["slider-bar"] ?? ""} w-full appearance-none`}
				value={sliderProgress}
				onChange={e => {
					setSliderProgress(Number(e.target.value))
				}}
			/>
		</div>
	)
}

function Toggle({ className = "" }: { className?: string }) {
	const [isMonthly, setIsMonthly] = useState(false)

	const discountBackgroundColor = "bg-[var(--discount-background-color)]"
	const discountOnBackgroundColor = "text-[var(--discount-on-background-color)]"

	return (
		<div className={className}>
			<div className="relative flex justify-center">
				<div className="mr-2 text-sm text-gray-600">Monthly Billing</div>
				<button
					type="button"
					className={`rounded-full
          ${styles.pricing_slider_toggle ?? ""} 
          ${isMonthly ? `${styles.active ?? ""}` : ""}`}
					onClick={() => {
						setIsMonthly(prev => !prev)
					}}
				/>
				<div className="ml-2 text-sm text-gray-600">Yearly Billing</div>
				<div
					className={`absolute  right-2 top-6 rounded-full px-2 text-xs font-medium sm:right-10 sm:top-[2px] ${discountBackgroundColor} ${discountOnBackgroundColor}`}
				>
					25% discount
				</div>
			</div>
		</div>
	)
}

function Card({ children }: { children?: JSX.Element | JSX.Element[] }) {
	return (
		<div className="w-[36rem] min-w-[296px] overflow-hidden rounded-md bg-[var(--colar-gray-2)] p-4 sm:p-8">
			{children}
		</div>
	)
}

export default function PriceSlider() {
	return (
		<div className="mb-8 flex items-center justify-center transition-all">
			<Card>
				<div className="flex w-full items-center justify-between">
					<div className="font-bold text-gray-400">100K PAGEVIEWS</div>
					<div className="flex items-center">
						<span className="font-extrabold text-[var(--secondary-color)] sm:text-3xl">$16.00</span>
						<span className="text-xs font-bold text-gray-400">&nbsp;/ month</span>
					</div>
				</div>
				<Slider />
				<Toggle className="my-8" />
				<hr className="mb-8" />
				<div className="mb-2 flex items-center justify-between">
					<ul className="flex flex-col items-start gap-2 text-start text-[var(--colar-gray-6)]">
						<li>✅ Unlimited websites</li>
						<li>✅ 100% data ownership</li>
						<li>✅ Email reports</li>
					</ul>
					<div>
						<button
							type="button"
							className="cbtn rounded-full bg-[var(--secondary-color)] text-[0.6rem] text-gray-50 hover:bg-slate-900 sm:px-10 sm:text-sm"
						>
							Start my trial
						</button>
					</div>
				</div>
			</Card>
		</div>
	)
}
