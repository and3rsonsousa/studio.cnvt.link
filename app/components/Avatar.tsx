import { FC } from "react";

export type AvatarType = {
	avatar: {
		name: string;
	};
	size?: "x" | "s" | "m" | "g";
	border?: boolean;
	_className?: string;
};

const Avatar: FC<AvatarType> = ({ avatar, size = "g", border, _className }) => {
	let classes = `grid text-gray-700 flex-none place-items-center font-bold uppercase bg-gray-100 rounded-full ${
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
			<div className="hidden lg:block">
				{avatar.name.substring(0, ["g", "m"].includes(size) ? 3 : 1)}
			</div>
			<div className="lg:hidden">{avatar.name.substring(0, 1)}</div>
		</div>
	);
};

export default Avatar;

// export default function Avatar({
// 	avatar,
// 	small = false,
// 	medium = false,
// 	smallest = false,
// 	border = false,
// 	inverted = false,
// 	_className,
// 	url,
// }: {
// 	avatar: AccountType | ProfileType;
// 	small?: Boolean;
// 	medium?: Boolean;
// 	smallest?: Boolean;
// 	border?: Boolean;
// 	inverted?: Boolean;
// 	_className?: string;
// 	url?: string;
// }) {
// 	return (
// 		<div className={_className}>
// 			<div
// 				onClick={() => {
// 					if (url) location.replace(url);
// 				}}
// 				className={` ${
// 					smallest
// 						? "text-xx h-4 w-4"
// 						: small
// 						? "h-6 w-6 text-xs"
// 						: medium
// 						? "h-9 w-9 text-sm"
// 						: "text-xx h-6 w-6 lg:h-14 lg:w-14 lg:text-base"
// 				} bg-neutral-2 text-neutral-4 flex justify-center overflow-hidden rounded-full font-bold items-center${
// 					border ? " ring-2 ring-white" : ""
// 				} ${url ? " cursor-pointer" : ""}`}
// 				style={
// 					"colors" in avatar
// 						? {
// 								backgroundColor: avatar.colors[0],
// 						  }
// 						: undefined
// 				}
// 			>
// 				{avatar.image ? (
// 					<img
// 						src={avatar.image}
// 						title={avatar.name}
// 						className="object-fit h-full w-full"
// 					/>
// 				) : (
// 					<span
// 						style={
// 							"colors" in avatar
// 								? {
// 										color: avatar.colors[1],
// 								  }
// 								: undefined
// 						}
// 					>
// 						<span className="lg:hidden">
// 							{avatar.name ? avatar.name.substring(0, 1) : "A"}
// 						</span>
// 						<span className="hidden lg:block">
// 							{avatar.name
// 								? avatar.name.substring(
// 										0,
// 										smallest || small ? 1 : 3
// 								  )
// 								: "A"}
// 						</span>
// 					</span>
// 				)}
// 			</div>
// 		</div>
// 	);
// }
