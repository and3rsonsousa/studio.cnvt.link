import dayjs from "dayjs";
import { useState } from "react";
import { ActionType, DayType } from "~/types";
import { Day } from "./Day";
import { ViewHeader } from "./MonthView";

export default function WeekView({ actions }: { actions: ActionType[] }) {
	let today = dayjs();
	let [week, setWeek] = useState(today);
	let firstDay = week.startOf("w");
	let lastDay = week.endOf("w");
	let currentDay = firstDay;
	let weekDays: Array<DayType> = [];

	while (currentDay.format("YYYY/MM/DD") !== lastDay.add(1, "d").format("YYYY/MM/DD")) {
		weekDays.push({
			day: currentDay,
			actions: actions.filter(
				(action) => dayjs(action.end).format("YYYY/MM/DD") === currentDay.format("YYYY/MM/DD")
			),
		});
		currentDay = currentDay.add(1, "d");
	}

	return (
		<div className="section-sm p-0">
			<ViewHeader
				title={`${firstDay.format(
					`D ${firstDay.month() !== lastDay.month() ? " [de] MMMM " : ""} ${
						firstDay.year() !== lastDay.year() ? " [de] YYYY " : ""
					}`
				)} 
						${lastDay.format(`[a] D [de] MMMM ${firstDay.year() !== lastDay.year() ? " [de] YYYY " : ""}`)}`}
				next={() => setWeek(week.add(1, "week"))}
				prev={() => setWeek(week.subtract(1, "week"))}
			/>

			<div className="grid lg:grid-cols-7">
				{weekDays.map((day, index) => (
					<div className={day.actions.length === 0 ? "hidden lg:block" : ""} key={index}>
						<Day day={day} index={index} dayName={true} size="s" month={week} today={today} />
					</div>
				))}
			</div>
		</div>
	);
}
