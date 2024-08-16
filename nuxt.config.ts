// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	image: {
		domains: ["plant.id"],
	},

	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	css: ["~/assets/css/main.css"],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	runtimeConfig: {
		// Make environment variables accessible here
		public: {
			VITE_PLANTID_API_KEY: process.env.VITE_PLANTID_API_KEY,
			// Add more environment variables as needed
		},
	},

	modules: ["@nuxt/image"],
});
