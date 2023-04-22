import { type Config } from "tailwindcss"

export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "475px"
			}
		}
	},
	plugins: [
		require("tailwindcss-text-fill-stroke") // no options to configure
	]
} satisfies Config
