let colors = require("tailwindcss/colors");

module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./styles/*.html"],
	theme: {
		colors: {
			...colors,
			gray: colors.slate,
			brand: colors.indigo,
		},
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
