/** @type {import('prettier').Config} */
const config = {
	arrowParens: "always",
	printWidth: 120,
	singleQuote: false,
	jsxSingleQuote: false,
	arrowParens: "avoid",
	semi: false,
	trailingComma: "none",
	tabWidth: 2,
	useTabs: true,
	bracketSpacing: true,
	bracketSameLine: false,
	plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
	pluginSearchDirs: false,
	tailwindConfig: './tailwind.config.ts',
}

module.exports = config
