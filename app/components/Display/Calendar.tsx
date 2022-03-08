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
	let [view, set_view] = useState(1);
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
				rightComponent={
					<div className="button-group button-group-small">
						{views.map((single) => (
							<button
								className={`button button-small tracking-wide ${
									view === single.id ? "button-primary" : "button-white"
								}`}
								onClick={() => set_view(single.id)}
								key={single.id}
							>
								<span>
									<span>{single.name.slice(0, 1)}</span>
									<span className="hidden md:inline-block">{single.name.slice(1)}</span>
								</span>
							</button>
						))}
					</div>
				}
			/>
			<AnimatePresence exitBeforeEnter initial={false}>
				{view === 1 && (
					<motion.div key="Month" initial={slideV.initial} animate={slideV.animate} exit={slideV.exit}>
						<MonthView actions={actions} />
					</motion.div>
				)}
				{view === 2 && (
					<motion.div key="Week" initial={slideV.initial} animate={slideV.animate} exit={slideV.exit}>
						<WeekView actions={actions} />
					</motion.div>
				)}
				{view === 3 && (
					<motion.div key="Day" initial={slideV.initial} animate={slideV.animate} exit={slideV.exit}>
						<DayView actions={actions} />
					</motion.div>
				)}
				{view === 4 && (
					<motion.div key="Year" initial={slideV.initial} animate={slideV.animate} exit={slideV.exit}>
						<YearView actions={actions} />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
