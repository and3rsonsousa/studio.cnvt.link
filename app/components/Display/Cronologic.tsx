import { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import { isFuture, isLate, isToday } from "~/lib/functions";
import { ActionType } from "~/types";
import Action from "../Action";
import { Heading } from "../Display";
import GridActions from "./GridActions";

type DisplayProps = {
	actions: ActionType[];
	set_showAddActionForm: Dispatch<SetStateAction<boolean>>;
};

export default function Cronologic({ actions, set_showAddActionForm }: DisplayProps) {
	let [showMoreLateActions, set_showMoreLateActions] = useState(false);

	let lateActions: ActionType[] = [],
		todayActions: ActionType[] = [],
		futureActions: ActionType[] = [];

	actions.map((action: ActionType) => {
		let date = action.start ? action.start : action.end;
		if (isLate(date) && !isToday(date)) {
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
						subTitle={`${lateActions.length} ${lateActions.length === 1 ? "ação" : "ações"} em atraso`}
						rightComponent={
							lateActions.length > 6 ? (
								<button
									className="button button-small button-ghost"
									onClick={() => set_showMoreLateActions(!showMoreLateActions)}
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
							<Action key={action.id} action={action} size="n" />
						))}
						{showMoreLateActions &&
							lateActions
								.slice(6)
								.map((action: ActionType) => <Action size="n" key={action.id} action={action} />)}
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
					todayActions.map((action: ActionType) => <Action size="n" key={action.id} action={action} />)
				) : (
					<div className="col-span-2 text-gray-400">
						Nenhuma Ação para hoje. Toque aqui para{" "}
						<a
							href="#"
							className="font-bold text-brand-600 underline"
							onClick={() => set_showAddActionForm(true)}
						>
							criar.
						</a>
					</div>
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
							<Action key={action.id} action={action} size="n" />
						))}
					</GridActions>
				</>
			)}
		</>
	);
}
