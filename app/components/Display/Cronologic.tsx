import dayjs from "dayjs";
import { useState } from "react";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import { isFuture, isToday } from "~/lib/functions";
import { ActionType } from "~/types";
import Action from "../Action";
import { Heading } from "../Display";
import GridActions from "./GridActions";

type DisplayProps = {
	actions: ActionType[];
};

export default function Cronologic({ actions }: DisplayProps) {
	let lateActions: ActionType[] = [],
		todayActions: ActionType[] = [],
		futureActions: ActionType[] = [],
		accomplishedActions: ActionType[] = [];

	actions.map((action: ActionType) => {
		let date = action.start ? action.start : action.end;
		// Se estiver concluída
		if (action.step_id === 6) {
			accomplishedActions.push(action);
		} else if (isToday(date)) {
			todayActions.push(action);
		} else if (isFuture(date)) {
			futureActions.push(action);
		} else {
			lateActions.push(action);
		}
	});

	return (
		<>
			{lateActions.length > 0 && (
				<CronologicRow
					title="Em atraso"
					subtitle="em atraso"
					items={lateActions}
				/>
			)}

			{todayActions.length === 0 ? (
				<div className="my-16">Nenhuma Ação para hoje.</div>
			) : (
				<CronologicRow
					title="Hoje"
					subtitle="para hoje"
					items={todayActions}
				/>
			)}

			{futureActions.length > 0 && (
				<CronologicRow
					title="Próximas"
					subtitle="para os próximos dias"
					items={futureActions}
				/>
			)}
			{accomplishedActions.length > 0 && (
				<CronologicRow
					title="Concluídas"
					subtitle="finalizadas"
					items={accomplishedActions.reverse()}
				/>
			)}
		</>
	);
}

function CronologicRow({
	title,
	subtitle,
	items,
}: {
	title: string;
	subtitle?: string;
	items: Array<ActionType>;
}) {
	let [showMore, setShowMore] = useState(false);

	return (
		<>
			<Heading
				title={title}
				subTitle={
					items.length > 0
						? `${items.length} ${
								items.length === 1 ? "ação" : "ações"
						  } ${subtitle}`
						: undefined
				}
				right={
					items.length > 6 ? (
						<button
							className="button button-small button-ghost"
							onClick={() => setShowMore(!showMore)}
						>
							{showMore ? (
								<>
									<span>Motrar menos</span>
									<HiOutlineMinusCircle className="text-xl" />
								</>
							) : (
								<>
									<span>Mostrar Todas</span>
									<HiOutlinePlusCircle className="text-xl" />
								</>
							)}
						</button>
					) : undefined
				}
			/>

			<GridActions>
				{items.slice(0, 6).map((action: ActionType) => (
					<Action key={action.id} action={action} />
				))}
				{showMore &&
					items
						.slice(6)
						.map((action: ActionType) => (
							<Action key={action.id} action={action} />
						))}
			</GridActions>
		</>
	);
}
