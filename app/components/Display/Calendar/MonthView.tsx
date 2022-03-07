import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiPlusCircle } from "react-icons/hi";
import Action from "~/components/Action";
import { ActionType } from "~/types";

export type DayType = { day: Dayjs; actions: Array<ActionType> };

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
		<div className="rounded-xl border bg-white shadow shadow-gray-500/20">
			<ViewHeader
				title={`${month.format("MMMM")}
					${month.year() !== today.year() ? month.format(" [de] YYYY") : ""}`}
				prev={() => set_month(month.subtract(1, "month"))}
				next={() => set_month(month.add(1, "month"))}
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

export function Day({
	day,
	index,
	month,
	today,
	size,
	dayName,
}: {
	day: DayType;
	index: number;
	month: Dayjs;
	today: Dayjs;
	size: "x" | "s" | "n";
	dayName?: boolean;
}) {
	let [showMore, set_showMore] = useState(false);
	return (
		<div
			className={`group ${
				!dayName ? ((index + 1) % 7 !== 0 ? "border-r border-t p-2" : "border-t p-2") : "p-1"
			} `}
		>
			{/* Número do dia */}
			{dayName ? (
				<div className={`mb-4`}>
					<div className="flex items-center gap-1 lg:flex-wrap lg:gap-0">
						<div
							className={`text-xs font-bold lg:text-base ${
								day.day.format("YYYY/MM/DD") === today.format("YYYY/MM/DD")
									? " text-brand-600"
									: "text-gray-700"
							} first-letter:uppercase lg:w-full`}
						>
							{day.day.format("dddd, ")}
						</div>
						<div className="text-xs">{day.day.format("D [de] MMMM")}</div>
					</div>
				</div>
			) : (
				<div className={`text-xs ${day.day.month() !== month.month() ? " text-gray-300" : ""}`}>
					{day.day.format("YYYY/MM/DD") === today.format("YYYY/MM/DD") ? (
						<div className={` grid h-6 w-6 place-content-center rounded-full bg-brand-500 text-white`}>
							{day.day.format("D")}
						</div>
					) : (
						<div>{day.day.format("D")}</div>
					)}
				</div>
			)}

			<div className="space-y-2">
				{dayName ? (
					day.actions.map((action) => <Action key={action.id} action={action} size={size} />)
				) : (
					<>
						{day.actions.slice(0, 3).map((action) => (
							<Action key={action.id} action={action} size={size} />
						))}
						{showMore &&
							day.actions
								.slice(3)
								.map((action) => <Action key={action.id} action={action} size={size} />)}
						<div className="pointer-events-none flex flex-col items-center justify-center group-hover:pointer-events-auto md:flex-row">
							{day.actions.length > 3 && (
								<button
									className="button button-ghost text-xx translate-x-3 p-1 opacity-25 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
									onClick={() => set_showMore(!showMore)}
								>
									{showMore ? "Exibir Menos" : "Exibir todas"}
								</button>
							)}
							<button className="button button-ghost p-1 opacity-0 group-hover:opacity-100">
								<HiPlusCircle className="text-lg" />
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export function WeekHeader() {
	return (
		<div className="grid grid-cols-7 text-xs font-bold text-gray-700">
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
