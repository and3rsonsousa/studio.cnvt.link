export let popup = {
	initial: {
		scale: 0.8,
		opacity: 0,
	},
	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			ease: "backOut",
		},
	},
	exit: {
		scale: 0.8,
		opacity: 0,
		transition: {
			ease: "backIn",
		},
	},
};

export let menu = {
	initial: {
		scale: 0.8,
		opacity: 0,
		x: "-50%",
	},
	animate: {
		scale: 1,
		opacity: 1,
		x: "-50%",
		transition: {
			ease: "backOut",
		},
	},
	exit: {
		scale: 0.8,
		opacity: 0,
		x: "-50%",
		transition: {
			ease: "backOut",
		},
	},
};
