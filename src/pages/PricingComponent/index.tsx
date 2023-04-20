import PriceSlider from "components/pages/PriceSlider"
import { useState } from "react"
import styles from "./index.module.css"

function JustaToggle() {
	const [isMonthly, setIsMonthly] = useState(false)

	return (
		<button
			type="button"
			className={`${styles.pricing_toggle_btn ?? ""} ${isMonthly ? `${styles.active ?? ""}` : ""} rounded-full`}
			onClick={() => {
				setIsMonthly(!isMonthly)
			}}
		/>
	)
}

function PricingComponent() {
	return (
		<div className="w-full">
			<h1 className="mb-6 text-center text-2xl font-bold text-[var(--colar-purple-1)]">Our Pricing</h1>
			<div className="flex items-center justify-center gap-6 text-[var(--colar-purple-1)]">
				<div className="text-sm">Annually</div>
				<JustaToggle />
				<div className="text-sm">Monthly</div>
			</div>
			<div className="no-scrollbar mt-10 h-full overflow-x-auto p-4">
				<div className="flex w-full items-start justify-center sm:items-center">
					<div className={`${styles["pricing-container"] ?? ""} sm:flex sm:scale-75 lg:scale-90`}>
						<div className="mb-4 w-64 shrink-0 rounded-xl bg-[var(--colar-gray-2)] p-4 text-gray-600 sm:h-[22rem]">
							<div className="font-bold">Basic</div>
							<div className="my-6 flex justify-center">
								<span className="self-center text-2xl font-bold">$</span>
								<span className="text-4xl font-extrabold">19.99</span>
							</div>
							<div className="mb-6">
								<div className="border-y-2 py-2">500 GB Storage</div>
								<div className="border-b-2 py-2">2 Users Allowed</div>
								<div className="border-b-2 py-2">Send up to 3 GB</div>
							</div>
							<button
								type="button"
								className={`w-full py-2 text-xs font-bold ${styles.btn_learn_more ?? ""} rounded-md`}
							>
								LEARN MORE
							</button>
						</div>
						<div className="mb-4 h-[22rem] w-64 shrink-0 rounded-xl bg-[var(--pricing-primary-color)] p-4 text-gray-200 sm:mt-[-1rem] sm:h-[24rem]">
							<div className="mt-[1rem]" />
							<div className="font-bold">Professional</div>
							<div className="my-6 flex justify-center">
								<span className="self-center text-2xl font-bold">$</span>
								<span className="text-4xl font-extrabold">24.99</span>
							</div>
							<div className="mb-6">
								<div className="border-y-2 py-2">1 TB Storage</div>
								<div className="border-b-2 py-2">5 Users Allowed</div>
								<div className="border-b-2 py-2">Send up to 10 GB</div>
							</div>
							<button
								type="button"
								className={`w-full py-2 text-xs font-bold ${styles.btn_learn_more_main ?? ""} rounded-md`}
							>
								LEARN MORE
							</button>
						</div>
						<div className="w-64 shrink-0 rounded-xl bg-[var(--colar-gray-2)] p-4 text-gray-600 sm:h-[22rem]">
							<div className="font-bold">Master</div>
							<div className="my-6 flex justify-center">
								<span className="self-center text-2xl font-bold">$</span>
								<span className="text-4xl font-extrabold">39.99</span>
							</div>
							<div className="mb-6">
								<div className="border-y-2 py-2">2 TB Storage</div>
								<div className="border-b-2 py-2">10 Users Allowed</div>
								<div className="border-b-2 py-2">Send up to 20 GB</div>
							</div>
							<button
								type="button"
								className={`w-full py-2 text-xs font-bold ${styles.btn_learn_more ?? ""} rounded-md`}
							>
								LEARN MORE
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function Pricing() {
	return (
		<div>
			<PricingComponent />
			<PriceSlider />
		</div>
	)
}
