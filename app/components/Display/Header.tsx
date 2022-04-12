import { Dispatch, SetStateAction } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import {
	HiOutlineCalendar,
	HiOutlineClock,
	HiOutlineViewList,
} from "react-icons/hi";
import { Link, redirect, useLoaderData } from "remix";
import { AccountType } from "~/types";
type HeaderProps = {
	display: string;
	setDisplay: Dispatch<SetStateAction<string>>;
};

export default function Header({ display, setDisplay }: HeaderProps) {
	let loaderData = useLoaderData();

	return (
		<div className="z-10 flex flex-wrap items-center justify-between gap-4 border-b bg-white p-4 sm:flex-nowrap lg:px-8">
			{loaderData?.account ? (
				<AccountName account={loaderData.account} />
			) : (
				<AccountName account="Dashboard" />
			)}
			<div className="flex sm:gap-2">
				{[
					{ id: "cronologic", icon: <HiOutlineClock /> },
					{ id: "calendar", icon: <HiOutlineCalendar /> },
					{ id: "list", icon: <HiOutlineViewList /> },
					{ id: "grid", icon: <BsGrid3X3 /> },
				].map((item) => {
					return item.id !== "grid" ||
						loaderData?.account !== undefined ? (
						<button
							className={`button button-icon ${
								display !== item.id ? "button-ghost" : ""
							} button-primary`}
							key={item.id}
							onClick={() => {
								setDisplay(item.id);
								window.history.pushState(
									"",
									"",
									`?display=${item.id}`
								);
							}}
						>
							{item.icon}
						</button>
					) : null;
				})}
			</div>
		</div>
	);
}

export function AccountName({ account }: { account: AccountType | string }) {
	return (
		<div className="min-w-0">
			<h2 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap font-semibold tracking-tighter text-gray-700">
				{typeof account === "string" ? account : account.name}
			</h2>
			{/* <div className=" text-xs font-medium text-gray-400">@{account.slug}</div> */}
		</div>
	);
}
