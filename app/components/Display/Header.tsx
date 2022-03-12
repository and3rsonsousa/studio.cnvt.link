import { Dispatch, SetStateAction } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineFilter, HiOutlineViewList } from "react-icons/hi";
import { useLoaderData } from "remix";
type HeaderProps = {
	display: number;
	setDisplay: Dispatch<SetStateAction<number>>;
};

export default function Header({ display, setDisplay }: HeaderProps) {
	let loaderData = useLoaderData();

	return (
		<div className="relative z-10 flex items-center justify-between border-b  bg-white px-4 py-6 lg:p-8">
			<div className="flex gap-2">
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

			{/* Implementar filtros */}
			<div>
				<button className="button button-icon button-ghost">
					<HiOutlineFilter />
				</button>
			</div>
		</div>
	);
}
