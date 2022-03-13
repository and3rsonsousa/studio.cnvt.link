import dayjs from "dayjs";
import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { ActionType, DayType } from "~/types";
import { Day } from "./Day";

export function MonthView({ actions }: { actions: ActionType[] }) {
	let today = dayjs();
	let [month, setMonth] = useState(today);
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
		<div className="section-sm overflow-hidden p-0">
			<ViewHeader
				title={`${month.format("MMMM")}
					${month.year() !== today.year() ? month.format(" [de] YYYY") : ""}`}
				prev={() => setMonth(month.subtract(1, "month"))}
				next={() => setMonth(month.add(1, "month"))}
			/>
			<WeekHeader />

			<section className="grid grid-cols-7">
				{monthDays.map((day, index) => (
					<Day day={day} index={index} month={month} key={index} today={today} size="x" />
				))}
			</section>
		</div>
	);
}

function WeekHeader() {
	return (
		<div className="text-xx grid grid-cols-7 text-center font-bold text-gray-700">
			<div className="p-2 lg:px-4">DOM</div>
			<div className="p-2 lg:px-4">SEG</div>
			<div className="p-2 lg:px-4">TER</div>
			<div className="p-2 lg:px-4">QUA</div>
			<div className="p-2 lg:px-4">QUI</div>
			<div className="p-2 lg:px-4">SEX</div>
			<div className="p-2 lg:px-4">SÁB</div>
		</div>
	);
}

export function ViewHeader({ title, prev, next }: { title: string; prev: any; next: any }) {
	return (
		<header className="border-b p-2 lg:p-4">
			<div className="flex items-center justify-between gap-4">
				{/* Nome do mês */}
				<h4 className="m-0 text-gray-700 first-letter:uppercase">{title}</h4>
				<div className="flex">
					{/* Mês anterior */}
					<button className="button button-small button-ghost" onClick={() => prev()}>
						<HiOutlineChevronLeft className="text-lg" />
					</button>
					{/* Próximo mês */}
					<button className="button button-small button-ghost" onClick={() => next()}>
						<HiOutlineChevronRight className="text-lg" />
					</button>
				</div>
			</div>
		</header>
	);
}
