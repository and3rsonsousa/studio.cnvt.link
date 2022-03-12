import { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import { isFuture, isLate, isToday } from "~/lib/functions";
import { ActionType } from "~/types";
import Action from "../Action";
import { Heading } from "../Display";
import GridActions from "./GridActions";

type DisplayProps = {
	actions: ActionType[];
};

export default function Cronologic({ actions }: DisplayProps) {
	let [showMoreLateActions, setShowMoreLateActions] = useState(false);

	let lateActions: ActionType[] = [],
		todayActions: ActionType[] = [],
		futureActions: ActionType[] = [],
		accomplishedActions: ActionType[] = [];

	actions.map((action: ActionType) => {
		let date = action.start ? action.start : action.end;
		if (action.step_id === 6) {
			accomplishedActions.push(action);
		} else if (isLate(date) && !isToday(date)) {
			lateActions.push(action);
		} else if (isFuture(date)) {
			futureActions.push(action);
		} else {
			todayActions.push(action);
		}
	});

	return (
		<>
			{lateActions.length > 0 && (
				<>
					<Heading
						title="Em atraso"
						subTitle={`${lateActions.length} ${lateActions.length === 1 ? "ação" : "ações"}`}
						rightComponent={
							lateActions.length > 6 ? (
								<button
									className="button button-small button-ghost"
									onClick={() => setShowMoreLateActions(!showMoreLateActions)}
								>
									{showMoreLateActions ? (
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
						{lateActions.slice(0, 6).map((action: ActionType) => (
							<Action key={action.id} action={action} />
						))}
						{showMoreLateActions &&
							lateActions
								.slice(6)
								.map((action: ActionType) => <Action key={action.id} action={action} />)}
					</GridActions>
				</>
			)}
			<Heading
				title="Hoje"
				subTitle={
					todayActions.length > 0
						? `${todayActions.length} ${todayActions.length === 1 ? "ação" : "ações"} para hoje`
						: undefined
				}
			/>
			<GridActions>
				{todayActions.length > 0 ? (
					todayActions.map((action: ActionType) => <Action key={action.id} action={action} />)
				) : (
					<div className="col-span-2 text-gray-400">Nenhuma Ação para hoje.</div>
				)}
			</GridActions>
			{futureActions.length > 0 && (
				<>
					<Heading
						title="Próximas"
						subTitle={
							futureActions.length > 0
								? `${futureActions.length} ${
										futureActions.length === 1 ? "ação" : "ações"
								  } para os próximos dias`
								: undefined
						}
					/>
					<GridActions>
						{futureActions.map((action: ActionType) => (
							<Action key={action.id} action={action} />
						))}
					</GridActions>
				</>
			)}
			{accomplishedActions.length > 0 && (
				<>
					<Heading
						title="Concluídas"
						subTitle={
							futureActions.length > 0
								? `${futureActions.length} ${
										futureActions.length === 1 ? "ação" : "ações"
								  } para os próximos dias`
								: undefined
						}
					/>
					<GridActions>
						{accomplishedActions.map((action: ActionType) => (
							<Action key={action.id} action={action} />
						))}
					</GridActions>
				</>
			)}
		</>
	);
}
