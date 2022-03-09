export let popup = {
	initial: {
		scale: 0.8,
		opacity: 0,
	},
	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			ease: "easeOut",
		},
	},
	exit: {
		scale: 0.8,
		opacity: 0,
		transition: {
			ease: "easeOut",
		},
	},
};

export let menu = {
	initial: {
		scale: 0.9,
		opacity: 0,
	},
	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			ease: "easeOut",
		},
	},
	exit: {
		scale: 0.9,
		opacity: 0,
		transition: {
			ease: "easeOut",
		},
	},
};

export let slideH = {
	initial: {
		opacity: 0,
		x: 100,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		x: -100,
		transition: {
			ease: "easeOut",
		},
	},
};

export let slideV = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		y: -100,
		transition: {
			ease: "easeOut",
		},
	},
};

export let fade = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			ease: "easeOut",
		},
	},
};
