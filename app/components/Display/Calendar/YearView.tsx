import dayjs from "dayjs";
import { useState } from "react";
import { ActionType } from "~/types";
import GridActions from "../GridActions";
import { DayType } from "./MonthView";

export default function YearView({ actions }: { actions: ActionType[] }) {
	let today = dayjs();
	let [year, set_year] = useState(today);
	let firstDay = year.startOf("y").startOf("w");
	let lastDay = year.endOf("y").endOf("w");
	let currentDay = firstDay;
	let yearDays: Array<DayType> = [];

	while (currentDay.format("YYYY/MM/DD") !== lastDay.add(1, "d").format("YYYY/MM/DD")) {
		yearDays.push({
			day: currentDay,
			actions: actions.filter(
				(action) => dayjs(action.end).format("YYYY/MM/DD") === currentDay.format("YYYY/MM/DD")
			),
		});
		currentDay = currentDay.add(1, "d");
	}

	return (
		<div className="rounded-xl border bg-white shadow shadow-gray-500/20">
			{/* <ViewHeader
				title={Today.day.format(`D [de] MMMM ${day.year() !== today.year() ? " [de] YYYY" : ""}`)}
				prev={() => set_day(day.subtract(1, "day"))}
				next={() => set_day(day.add(1, "day"))}
			/> */}

			<div className="p-2 lg:p-4">
				<GridActions>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit dolorem labore doloremque
						voluptas, sed aperiam delectus vero perspiciatis ducimus, excepturi sapiente, alias ea officiis!
						Ad nesciunt reiciendis sed totam? Eaque!
					</p>
				</GridActions>
			</div>
		</div>
	);
}
