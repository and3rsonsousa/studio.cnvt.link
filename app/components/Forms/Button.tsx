import { motion } from "framer-motion";

export type ButtonProps = {
	isAdding?: boolean;
	primary?: boolean;
	size?: "small" | "large";
	icon?: boolean;
	ghost?: boolean;
	text: string;
	name?: string;
	value?: string;
	form?: string;
	onClick?: () => {};
};

export function Button({
	isAdding,
	primary,
	size,
	icon = false,
	ghost = false,
	text,
	name,
	value,
	form,
	onClick,
}: ButtonProps) {
	return (
		<motion.button
			layout
			transition={{
				ease: "easeOut",
			}}
			type="submit"
			className={`button ${primary ? "button-primary" : null} ${
				size
					? size === "small"
						? "buton-small"
						: "button-large"
					: null
			} ${icon ?? "button-icon"} ${ghost ? "button-ghost" : null}`}
			name={name}
			value={value}
			disabled={isAdding}
			form={form ? form : undefined}
		>
			{isAdding ? (
				<div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
			) : (
				text
			)}
		</motion.button>
	);
}
