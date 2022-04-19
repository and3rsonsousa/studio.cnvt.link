import dayjs from "dayjs";
import { useState } from "react";
import { ActionCard } from "~/components/Action";
import { ActionType, DayType } from "~/types";
import GridActions from "../GridActions";
import { ViewHeader } from "./MonthView";

export default function DayView({ actions }: { actions: Array<ActionType> }) {
	let today = dayjs();
	let [day, setDay] = useState(today);

	let Today: DayType = {
		day: day,
		actions: actions.filter(
			(action) =>
				dayjs(action.end).format("YYYY/MM/DD") ===
				day.format("YYYY/MM/DD")
		),
	};

	return (
		<div className="section-sm p-0">
			<ViewHeader
				title={Today.day.format(
					`D [de] MMMM ${
						day.year() !== today.year() ? " [de] YYYY" : ""
					}`
				)}
				prev={() => setDay(day.subtract(1, "day"))}
				next={() => setDay(day.add(1, "day"))}
			/>
			<div className="p-2 lg:p-4">
				<GridActions>
					{Today.actions.length > 0 ? (
						Today.actions.map((action) => (
							<ActionCard action={action} key={action.id} />
						))
					) : (
						<div>Nenhuma ação para esse dia.</div>
					)}
				</GridActions>
			</div>
		</div>
	);
}
