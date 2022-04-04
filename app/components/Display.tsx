import { AnimatePresence, motion } from "framer-motion";
import { ReactChild, useState } from "react";
import { slideH } from "~/lib/animations";
import { ActionType } from "~/types";
import Calendar from "./Display/Calendar";
import Cronologic from "./Display/Cronologic";
import Grid from "./Display/Grid";
import Header from "./Display/Header";
import List from "./Display/List";

type DisplayProps = {
	actions: ActionType[];
};

export default function Display({ actions }: DisplayProps) {
	let [display, setDisplay] = useState<number>(1);

	return (
		<div>
			{/* Header */}
			<Header display={display} setDisplay={setDisplay} />
			<div className="px-4 py-6 lg:p-8">
				{/* - Cronológico */}
				{display === 1 && <Cronologic actions={actions} />}

				{/* - Calendário */}
				{/* - - Mês */}
				{/* - - Semana */}
				{/* - - Dia */}
				{/* - - Ano */}

				{display === 2 && <Calendar actions={actions} />}

				{/* - Lista */}
				{display === 3 && <List actions={actions} />}

				{/* - Grid */}
				{display === 4 && <Grid actions={actions} />}
			</div>
		</div>
	);
}

export function Heading({
	title,
	middle,
	right,
	subTitle,
}: {
	title: string;
	middle?: ReactChild;
	right?: ReactChild;
	subTitle?: string;
}) {
	return (
		<div className="flex justify-between gap-4 overflow-hidden">
			<div className="mb-8">
				<h3 className="m-0 text-gray-700 ">{title}</h3>
				{subTitle && (
					<div className="text-xx font-medium uppercase tracking-wide text-gray-400">
						{subTitle}
					</div>
				)}
			</div>
			{middle && <div>{middle}</div>}
			{right && <div>{right}</div>}
		</div>
	);
}
