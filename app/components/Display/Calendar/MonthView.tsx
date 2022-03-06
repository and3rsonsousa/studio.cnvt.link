import dayjs from "dayjs";
import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Action from "~/components/Action";
import { ActionType } from "~/types";

export function MonthView({ actions }: { actions: ActionType[] }) {
	let today = dayjs();
	let [month, set_month] = useState(today);
	let firstDay = today.startOf("M").startOf("w");
	let lastDay = today.endOf("M").endOf("w");
	let currentDay = firstDay;
	let monthDays = [];

	while (currentDay.format("YYYY/MM/DD") !== lastDay.add(1, "d").format("YYYY/MM/DD")) {
		monthDays.push({
			day: currentDay,
			actions: actions.filter(
				(action) => dayjs(action.end).format("YYYY/MM/DD") === currentDay.format("YYYY/MM/DD")
			),
		});
		currentDay = currentDay.add(1, "d");
	}

	return (
		<>
			<header className="flex justify-between border-b pb-4">
				<div className="flex items-center gap-4">
					{/* Nome do mês */}
					<h5 className="m-0 text-gray-700">{month.format("MMMM")}</h5>
					<div className="flex">
						{/* Mês anterior */}
						<button className="button button-small button-white rounded-r-none">
							<HiOutlineChevronLeft className="text-lg" />
						</button>
						{/* Próximo mês */}
						<button className="button button-small button-white rounded-l-none">
							<HiOutlineChevronRight className="text-lg" />
						</button>
					</div>
				</div>
				<div className="button-group button-group-small">
					{/* Mês */}
					<button className="button button-small button-white  tracking-wide">
						<span>
							<span>M</span>
							<span className="hidden md:inline-block">ês</span>
						</span>
						{/* <BsGrid3X2 /> */}
					</button>
					{/* Semana */}
					<button className="button button-small button-white  tracking-wide">
						<span>
							<span>S</span>
							<span className="hidden md:inline-block">emana</span>
						</span>
						{/* <MdOutlineViewWeek /> */}
					</button>
					{/* Hoje */}
					<button className="button button-small button-white  tracking-wide">
						<span>
							<span>H</span>
							<span className="hidden md:inline-block">oje</span>
						</span>
						{/* <MdOutlineViewDay /> */}
					</button>
					{/* Ano */}
					<button className="button button-small button-white  tracking-wide">
						<span>
							<span>A</span>
							<span className="hidden md:inline-block">no</span>
						</span>
						{/* <HiOutlineCalendar /> */}
					</button>
				</div>
			</header>
			<div className="grid grid-cols-7 py-4 text-xs font-bold text-gray-700">
				<div>DOM</div>
				<div>SEG</div>
				<div>TER</div>
				<div>QUA</div>
				<div>QUI</div>
				<div>SEX</div>
				<div>SÁB</div>
			</div>
			<section className="grid grid-cols-7">
				{monthDays.map((day, index) => (
					<div className={`border-t p-2 ${(index + 1) % 7 !== 0 ? "border-r" : ""}`}>
						<div className={`mb-2  text-sm  ${day.day.month() !== month.month() ? " text-gray-300" : ""}`}>
							{day.day.date()}
						</div>
						<div className="space-y-2">
							{day.actions.map((action) => (
								<Action key={action.id} action={action} small={true} />
							))}
						</div>
					</div>
				))}
			</section>
		</>
	);
}
