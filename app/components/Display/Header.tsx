import { Dispatch, SetStateAction } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
type HeaderProps = {
	display: number;
	set_display: Dispatch<SetStateAction<number>>;
};

export default function Header({ display, set_display }: HeaderProps) {
	return (
		<div className="mb-4 flex items-center justify-between  border-b pb-4">
			<div className="flex gap-2">
				{[
					{ id: 1, icon: <HiOutlineClock /> },
					{ id: 2, icon: <HiOutlineCalendar /> },
					{ id: 3, icon: <HiOutlineViewList /> },
					{ id: 4, icon: <BsGrid3X3 /> },
				].map((item) => (
					<button
						className={`button button-icon ${display !== item.id ? "button-ghost" : ""} button-primary`}
						key={item.id}
						onClick={() => set_display(item.id)}
					>
						{item.icon}
					</button>
				))}
			</div>

			{/* Implementar filtros */}
			<div>Filtros</div>
		</div>
	);
}
