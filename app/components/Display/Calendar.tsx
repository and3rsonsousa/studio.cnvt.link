import dayjs from "dayjs";
import { useState } from "react";
import { ActionType } from "~/types";
import Action from "../Action";

type CalendarProps = {
	actions: ActionType[];
};

export default function Calendar({ actions }: CalendarProps) {
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
		<div>
			<h3>Calendário</h3>
			<header className="grid grid-cols-7 py-4 text-xs font-bold text-gray-700">
				<div>DOM</div>
				<div>SEG</div>
				<div>TER</div>
				<div>QUA</div>
				<div>QUI</div>
				<div>SEX</div>
				<div>SÁB</div>
			</header>
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
		</div>
	);
}
