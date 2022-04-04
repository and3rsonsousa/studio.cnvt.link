import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { slideV } from "~/lib/animations";
import { ActionType } from "~/types";
import DayView from "./Calendar/DayView";
import { MonthView } from "./Calendar/MonthView";
import WeekView from "./Calendar/WeekView";
import YearView from "./Calendar/YearView";
import { Heading } from "../Display";

type CalendarProps = {
	actions: ActionType[];
};

export default function Calendar({ actions }: CalendarProps) {
	let colors = ["Nenhum", "Flow", "Step", "Tag"];
	let [view, setView] = useState(1);
	let [color, setColor] = useState<string | undefined>();
	let views = [
		{
			id: 1,
			name: "Mês",
		},
		{
			id: 2,
			name: "Semana",
		},
		{
			id: 3,
			name: "Dia",
		},
		// {
		// 	id: 4,
		// 	name: "Ano",
		// },
	];

	return (
		<>
			<Heading
				title={views.filter((single) => single.id === view)[0].name}
				middle={
					<div className="button-group button-group-small">
						{colors.map((single, index) => (
							<button
								className={`button button-small tracking-wide ${
									index === 0 && color === undefined
										? "button-primary"
										: color === single
										? "button-primary"
										: "button-white"
								}`}
								onClick={() =>
									setColor(
										single === "Nenhum" ? undefined : single
									)
								}
								key={index}
							>
								<span>
									<span>{single.slice(0, 1)}</span>
									<span className="hidden md:inline-block">
										{single.slice(1)}
									</span>
								</span>
							</button>
						))}
					</div>
				}
				right={
					<div className="button-group button-group-small">
						{views.map((single) => (
							<button
								className={`button button-small tracking-wide ${
									view === single.id
										? "button-primary"
										: "button-white"
								}`}
								onClick={() => setView(single.id)}
								key={single.id}
							>
								<span>
									<span>{single.name.slice(0, 1)}</span>
									<span className="hidden md:inline-block">
										{single.name.slice(1)}
									</span>
								</span>
							</button>
						))}
					</div>
				}
			/>

			{view === 1 && <MonthView actions={actions} color={color} />}
			{view === 2 && <WeekView actions={actions} color={color} />}
			{view === 3 && <DayView actions={actions} />}
			{view === 4 && <YearView actions={actions} />}
		</>
	);
}
