import { useState } from "react";
import { useSearchParams } from "@remix-run/react";
import type { ActionType } from "~/types";
import Calendar from "./Display/Calendar";
import Cronologic from "./Display/Cronologic";
import Grid from "./Display/Grid";
import Header from "./Display/Header";
import List from "./Display/List";

type DisplayProps = {
	actions: ActionType[];
};

export default function Display({ actions }: DisplayProps) {
	let [searchParams] = useSearchParams();
	let display = searchParams.get("display") as string;
	let [internalDisplay, setDisplay] = useState<string>(
		display || "cronologic"
	);

	return (
		<div>
			{/* Header */}
			<Header display={internalDisplay} setDisplay={setDisplay} />
			<div className="px-4 py-6 lg:p-8">
				{/* - Cronológico */}
				{internalDisplay === "cronologic" && (
					<Cronologic actions={actions} />
				)}

				{/* - Calendário */}
				{/* - - Mês */}
				{/* - - Semana */}
				{/* - - Dia */}
				{/* - - Ano */}

				{internalDisplay === "calendar" && (
					<Calendar actions={actions} />
				)}

				{/* - Lista */}
				{internalDisplay === "list" && <List actions={actions} />}

				{/* - Grid */}
				{internalDisplay === "grid" && <Grid actions={actions} />}
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
	middle?: JSX.Element;
	right?: JSX.Element;
	subTitle?: string;
}) {
	return (
		<div className="flex justify-between gap-4">
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
