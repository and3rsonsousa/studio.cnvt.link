import { FC } from "react";

export type AvatarProps = {
	avatar: {
		name: string;
	};
	size?: "x" | "s" | "m" | "g";
	border?: boolean;
	_className?: string;
};

const Avatar: FC<AvatarProps> = ({ avatar, size = "g", border, _className }) => {
	let classes = `grid text-gray-500 flex-none place-items-center font-bold uppercase bg-gray-200 rounded-full ${
		border ? " ring-2 ring-white " : ""
	} ${_className ? _className : ""}`;

	switch (size) {
		case "x":
			classes += "text-xxx h-4 w-4 leading-none";
			break;
		case "s":
			classes += "h-6 w-6 text-xs";
			break;
		case "m":
			classes += "h-9 w-9 text-sm";
			break;
		default:
			classes += "text-xx h-6 w-6 lg:h-12 lg:w-12 lg:text-base";
			break;
	}

	return (
		<div className={classes}>
			<div className="hidden lg:block">{avatar.name.substring(0, ["g", "m"].includes(size) ? 3 : 1)}</div>
			<div className="lg:hidden">{avatar.name.substring(0, 1)}</div>
		</div>
	);
};

export default Avatar;
