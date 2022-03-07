import dayjs from "dayjs";
import { useState } from "react";
import Action from "~/components/Action";
import { ActionType } from "~/types";
import GridActions from "../GridActions";
import { DayType, ViewHeader } from "./MonthView";

export default function DayView({ actions }: { actions: ActionType[] }) {
	let today = dayjs();
	let [day, set_day] = useState(today);

	let Today: DayType = {
		day: day,
		actions: actions.filter((action) => dayjs(action.end).format("YYYY/MM/DD") === day.format("YYYY/MM/DD")),
	};

	return (
		<div className="rounded-xl border bg-white shadow shadow-gray-500/20">
			<ViewHeader
				title={Today.day.format(`D [de] MMMM ${day.year() !== today.year() ? " [de] YYYY" : ""}`)}
				prev={() => set_day(day.subtract(1, "day"))}
				next={() => set_day(day.add(1, "day"))}
			/>
			<div className="p-2 lg:p-4">
				<GridActions>
					{Today.actions.length > 0 ? (
						Today.actions.map((action) => <Action action={action} key={action.id} size="n" />)
					) : (
						<div>Nenhuma ação para esse dia.</div>
					)}
				</GridActions>
			</div>
		</div>
	);
}
