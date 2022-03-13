import { Dayjs } from "dayjs";
import { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { ActionLink } from "~/components/Action";
import { isToday } from "~/lib/functions";
import { DayType } from "~/types";

export function Day({
	day,
	index,
	month,
	// today,
	// size,
	dayName,
}: {
	day: DayType;
	index: number;
	month: Dayjs;
	today: Dayjs;
	size: "x" | "s" | "n";
	dayName?: boolean;
}) {
	return (
		<div
			className={`group ${!dayName ? ((index + 1) % 7 !== 0 ? "border-r border-t" : "border-t") : ""} ${
				day.day.month() !== month.month() ? "  bg-gray-100 text-gray-400" : ""
			}`}
		>
			{/* Número do dia */}
			{dayName ? (
				<div
					className={`flex items-center gap-1 border-b ${
						isToday(day.day) ? "bg-brand-50 text-brand-600" : "bg-gray-100 text-gray-700 lg:bg-white"
					} p-2 lg:flex-wrap lg:gap-0`}
				>
					<div
						className={`overflow-hidden text-ellipsis  whitespace-nowrap text-sm font-semibold first-letter:uppercase lg:w-full`}
					>
						{day.day.format("dddd")}
					</div>
					<div className="text-xs">{day.day.format("D [de] MMMM")}</div>
				</div>
			) : (
				<div className={`text-xx p-2`}>
					{isToday(day.day) ? (
						<div className={` -m-1 grid h-6 w-6 place-content-center rounded-full bg-brand-500 text-white`}>
							{day.day.format("D")}
						</div>
					) : (
						<div>{day.day.format("D")}</div>
					)}
				</div>
			)}

			<div className={`${dayName ? "space-y-4 lg:space-y-2" : "space-y-2"}  px-2 py-4`}>
				{day.actions.map((action) => (
					<ActionLink key={action.id} action={action} small={!dayName} />
				))}
			</div>
		</div>
	);
}
