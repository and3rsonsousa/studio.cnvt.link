import dayjs from "dayjs";
import { useState } from "react";
import { LoaderFunction } from "remix";
import { ActionType, DayType } from "~/types";
import { ActionGrid } from "../Action";
import { Heading } from "../Display";
import { ViewHeader } from "./Calendar/MonthView";

type GridProps = {
	actions: ActionType[];
};

export default function Grid({ actions }: GridProps) {
	let today = dayjs();
	let [month, setMonth] = useState(today);
	let firstDay = month.startOf("M").startOf("w");
	let lastDay = month.endOf("M").endOf("w");
	let currentDay = firstDay;
	// let monthDays: Array<DayType> = [];
	let _actions: Array<ActionType> = actions.filter((action) => {
		if (
			(dayjs(action.end).isAfter(firstDay.subtract(1, "day")) ||
				dayjs(action.end).isBefore(lastDay.add(1, "day"))) &&
			[1, 3, 6].filter((n) => n === action.tag_id).length > 0
		) {
			return true;
		}
		return false;
	});

	_actions = _actions.sort((a, b) => (dayjs(a.end).isAfter(b.end) ? -1 : 1));

	// console.warn(
	// 	Math.ceil(_actions.length / 3) * 3,
	// 	Math.floor(_actions.length / 3)
	// );

	let qtd = _actions.length;
	let total = Math.ceil(qtd / 3) * 3;
	let lastIndex = Math.floor(qtd / 3) * 3;
	console.warn({ qtd }, { total }, { lastIndex });

	return (
		<div>
			<Heading title="Instagram Grid" />
			<div className="section-sm max-w-2xl overflow-hidden bg-gray-100 p-0">
				<div className="bg-white">
					<ViewHeader
						title={`${month.format("MMMM")}
					${month.year() !== today.year() ? month.format(" [de] YYYY") : ""}`}
						prev={() => setMonth(month.subtract(1, "month"))}
						next={() => setMonth(month.add(1, "month"))}
					/>
				</div>
				<div className="grid grid-cols-3">
					{_actions.map((action, index) => (
						<ActionGrid
							key={action.id}
							action={action}
							className={`
								${(index + 1) % 3 !== 0 ? "border-r" : ""}
								${lastIndex > index ? "border-b" : ""}
									`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
