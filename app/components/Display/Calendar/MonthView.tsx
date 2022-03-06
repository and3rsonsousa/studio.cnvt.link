import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiPlus, HiPlusCircle } from "react-icons/hi";
import Action from "~/components/Action";
import { ActionType } from "~/types";

type DayType = { day: Dayjs; actions: Array<ActionType> };

export function MonthView({ actions }: { actions: ActionType[] }) {
	let today = dayjs();
	let [month, set_month] = useState(today);
	let firstDay = month.startOf("M").startOf("w");
	let lastDay = month.endOf("M").endOf("w");
	let currentDay = firstDay;
	let monthDays: Array<DayType> = [];

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
					<div className="button-group">
						{/* Mês anterior */}
						<button
							className="button button-small button-white"
							onClick={() => set_month(month.subtract(1, "month"))}
						>
							<HiOutlineChevronLeft className="text-lg" />
						</button>
						{/* Próximo mês */}
						<button
							className="button button-small button-white"
							onClick={() => set_month(month.add(1, "month"))}
						>
							<HiOutlineChevronRight className="text-lg" />
						</button>
					</div>
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
					<Day day={day} index={index} month={month} />
				))}
			</section>
		</>
	);
}

function Day({ day, index, month }: { day: DayType; index: number; month: Dayjs }) {
	let [showMore, set_showMore] = useState(false);
	return (
		<div className={`group border-t p-2 ${(index + 1) % 7 !== 0 ? "border-r" : ""}`}>
			<div className={`mb-2  text-sm  ${day.day.month() !== month.month() ? " text-gray-300" : ""}`}>
				{day.day.date()}
			</div>
			<div className="space-y-2">
				{/* 
        Guardar para BACKUP
        {day.actions.map((action) => (
					<Action key={action.id} action={action} small={true} />
				))} */}
				{day.actions.slice(0, 3).map((action) => (
					<Action key={action.id} action={action} small={true} />
				))}
				{showMore &&
					day.actions.slice(3).map((action) => <Action key={action.id} action={action} small={true} />)}
				<div className="pointer-events-none flex -translate-y-4 flex-col items-center justify-center opacity-0 transition duration-300 group-hover:pointer-events-auto  group-hover:translate-y-0 group-hover:opacity-100 md:flex-row">
					{day.actions.length > 3 && (
						<button className="button button-ghost text-xx p-1" onClick={() => set_showMore(!showMore)}>
							{showMore ? "Exibir Menos" : "Exibir todas"}
						</button>
					)}
					<button className="button button-ghost p-1">
						<HiPlusCircle className="text-lg" />
					</button>
				</div>
			</div>
		</div>
	);
}
