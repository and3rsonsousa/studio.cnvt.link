let colors = require("tailwindcss/colors");

module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			...colors,
			gray: colors.slate,
		},
		extend: {},
	},
	plugins: [],
};
