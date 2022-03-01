let colors = require("tailwindcss/colors");

module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: "#ffffff",
			black: "#000000",
			gray: {
				50: "#F4F5F7",
				100: "#D8DBE2",
				200: "#BCC1CC",
				300: "#A1A7B5",
				400: "#868E9E",
				500: "#6C7486",
				600: "#525B6E",
				700: "#394255",
				800: "#222C3A",
				900: "#0F151C",
			},
			brand: {
				50: "#F4F2FF",
				100: "#D5CAFF",
				200: "#BBA2FF",
				300: "#A679FF",
				400: "#9651FF",
				500: "#8928FF",
				600: "#8001FF",
				700: "#6006CF",
				800: "#4409A2",
				900: "#2E0A76",
			},
			eletric: "#fa3889",
			brave: "#ff6e4e",
			bright: "#ffcc33",
			neon: "#6ef76e",
			pacific: "#0ce9da",
			azure: "#3377ff",

			error: colors.red,
			success: colors.emerald,
			warning: colors.yellow,

			account: colors.violet,
			planning: colors.blue,
			copy: colors.teal,
			creative: colors.green,
			financial: colors.lime,

			idea: colors.yellow,
			do: colors.orange,
			doing: colors.red,
			review: colors.pink,
			done: colors.purple,
			accomplished: colors.indigo,

			post: colors.purple,
			stories: colors.rose,
			reels: colors.amber,
			meeting: colors.yellow,
			copy: colors.emerald,
			video: colors.sky,
			shooting: colors.blue,
			press: colors.indigo,
			task: colors.lime,
			tiktok: colors.pink,
		},
	},
	extend: {
		screens: {
			"3xl": "2000px",
		},
	},

	plugins: [require("@tailwindcss/forms")],
};
