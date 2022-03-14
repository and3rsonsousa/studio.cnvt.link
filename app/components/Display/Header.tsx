import { Dispatch, SetStateAction } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineFilter, HiOutlineViewList } from "react-icons/hi";
import { useLoaderData } from "remix";
import { AccountType } from "~/types";
type HeaderProps = {
	display: number;
	setDisplay: Dispatch<SetStateAction<number>>;
};

export default function Header({ display, setDisplay }: HeaderProps) {
	let loaderData = useLoaderData();

	// TODO: Implementar filtro
	// Filtrar por
	//	-	Flow
	//	-	Step
	//	-	Tag
	//	-	User
	//	-	Account

	return (
		<div className="z-10 flex flex-wrap items-center justify-between gap-4 border-b bg-white p-4 sm:flex-nowrap lg:px-8">
			<div className="flex sm:gap-2">
				{[
					{ id: 1, icon: <HiOutlineClock /> },
					{ id: 2, icon: <HiOutlineCalendar /> },
					{ id: 3, icon: <HiOutlineViewList /> },
					{ id: 4, icon: <BsGrid3X3 /> },
				].map((item) => {
					return item.id !== 4 || loaderData?.params?.slug !== undefined ? (
						<button
							className={`button button-icon ${display !== item.id ? "button-ghost" : ""} button-primary`}
							key={item.id}
							onClick={() => setDisplay(item.id)}
						>
							{item.icon}
						</button>
					) : null;
				})}
			</div>
			{loaderData?.account && <AccountName account={loaderData.account} />}

			{/* <div>
				<button className="button button-icon button-ghost">
					<HiOutlineFilter />
				</button>
			</div> */}
		</div>
	);
}

export function AccountName({ account }: { account: AccountType }) {
	return (
		<div className="min-w-0">
			<h2 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap font-semibold tracking-tighter text-gray-700">
				{account.name}
			</h2>
			{/* <div className=" text-xs font-medium text-gray-400">@{account.slug}</div> */}
		</div>
	);
}
