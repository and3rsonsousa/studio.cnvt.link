import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, ReactChild, SetStateAction, useState } from "react";
import { fade, slideH } from "~/lib/animations";
import { ActionType } from "~/types";
import Calendar from "./Display/Calendar";
import Cronologic from "./Display/Cronologic";
import Grid from "./Display/Grid";
import Header from "./Display/Header";
import List from "./Display/List";

type DisplayProps = {
	actions: ActionType[];
	set_showAddActionForm: Dispatch<SetStateAction<boolean>>;
};

export default function Display({ actions, set_showAddActionForm }: DisplayProps) {
	let [display, set_display] = useState<number>(1);

	return (
		<div>
			{/* Header */}
			<Header display={display} set_display={set_display} />
			<div className="px-4 py-6 lg:p-8">
				<AnimatePresence initial={false} exitBeforeEnter>
					{/* - Cronológico */}
					{display === 1 && (
						<motion.div
							layout
							key="cronologic"
							initial={slideH.initial}
							animate={slideH.animate}
							exit={slideH.exit}
						>
							<Cronologic actions={actions} set_showAddActionForm={set_showAddActionForm} />
						</motion.div>
					)}

					{/* - Calendário */}
					{/* - - Mês */}
					{/* - - Semana */}
					{/* - - Dia */}
					{/* - - Ano */}

					{display === 2 && (
						<motion.div
							layout
							key="calendar"
							initial={slideH.initial}
							animate={slideH.animate}
							exit={slideH.exit}
						>
							<Calendar actions={actions} />
						</motion.div>
					)}

					{/* - Lista */}
					{display === 3 && (
						<motion.div
							layout
							key="list"
							initial={slideH.initial}
							animate={slideH.animate}
							exit={slideH.exit}
						>
							<List actions={actions} />
						</motion.div>
					)}

					{/* - Grid */}
					{display === 4 && (
						<motion.div
							layout
							key="grid"
							initial={slideH.initial}
							animate={slideH.animate}
							exit={slideH.exit}
						>
							<Grid actions={actions} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

export function Heading({
	title,
	rightComponent,
	subTitle,
}: {
	title: string;
	rightComponent?: ReactChild;
	subTitle?: string;
}) {
	return (
		<div className="flex justify-between gap-4">
			<div className="mb-8">
				<h3 className="m-0 text-gray-700">{title}</h3>

				{subTitle && (
					<div className="text-xx font-medium uppercase tracking-wide text-gray-400">{subTitle}</div>
				)}
			</div>
			<div>{rightComponent}</div>
		</div>
	);
}
