/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"))

const isProd = process.env.NODE_ENV === "production"

const githubProdConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/my-nextjs-playground/Game2048",
				basePath: false,
				permanent: false
			},
			{
				source: "/my-nextjs-playground",
				destination: "/my-nextjs-playground/Game2048",
				basePath: false,
				permanent: false
			}
		]
	},
	basePath: isProd ? "/my-nextjs-playground" : "",
	assetPrefix: isProd ? "/my-nextjs-playground/" : "",
	images: {
		unoptimized: true
	}
}

/** @type {import("next").NextConfig} */
const defaultConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/Game2048",
				permanent: false
			}
		]
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "source.unsplash.com",
				port: "",
				pathname: "/collection/**"
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "**"
			}
		]
	},
	/**
	 * If you have the "experimental: { appDir: true }" setting enabled, then you
	 * must comment the below `i18n` config out.
	 *
	 * @see https://github.com/vercel/next.js/issues/41980
	 */
	i18n: {
		locales: ["en"],
		defaultLocale: "en"
	}
}

const config = isProd ? githubProdConfig : defaultConfig
export default config
