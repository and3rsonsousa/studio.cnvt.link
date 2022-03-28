let colors = require("tailwindcss/colors");

// TODO: Mudar algumas cores `puras` para cores mais modernas

module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		aspectRatio: {
			auto: "auto",
			square: "1 / 1",
			video: "16 / 9",
			1: "1",
			2: "2",
			3: "3",
			4: "4",
			5: "5",
			6: "6",
			7: "7",
			8: "8",
			9: "9",
			10: "10",
			11: "11",
			12: "12",
			13: "13",
			14: "14",
			15: "15",
			16: "16",
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: "#ffffff",
			black: "#000000",
			gray: colors.slate,
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
			planning: colors.pink,
			copy: colors.orange,
			creative: colors.yellow,
			financial: colors.lime,

			idea: colors.amber,
			do: colors.rose,
			doing: colors.purple,
			review: colors.indigo,
			done: colors.sky,
			accomplished: colors.green,

			post: colors.orange,
			stories: colors.amber,
			reels: colors.lime,
			meeting: colors.emerald,
			copywriting: colors.sky,
			video: colors.indigo,
			shooting: colors.purple,
			press: colors.fuchsia,
			task: colors.pink,
			tiktok: colors.rose,
		},
		extend: {
			screens: {
				"3xl": "2000px",
			},
		},
	},

	safelist: [
		{
			pattern:
				/bg-(account|planning|copy|creative|financial|idea|do|doing|review|done|accomplished|post|stories|reels|meeting|copywriting|video|shooting|press|task|tiktok)/,
		},
	],

	plugins: [require("@tailwindcss/aspect-ratio")],
};
