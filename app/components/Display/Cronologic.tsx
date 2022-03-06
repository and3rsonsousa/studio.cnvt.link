import { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import { isFuture, isLate } from "~/lib/functions";
import { ActionType } from "~/types";
import Action from "../Action";
import { Heading } from "./Display";

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
		if (isLate(action.start ? action.start : action.end)) {
			lateActions.push(action);
		} else if (isFuture(action.start ? action.start : action.end)) {
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

					<div className="mb-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-6">
						{lateActions.slice(0, 6).map((action: ActionType) => (
							<Action key={action.id} action={action} />
						))}
						{showMoreLateActions &&
							lateActions
								.slice(6)
								.map((action: ActionType) => <Action key={action.id} action={action} />)}
					</div>
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
			<div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
				{todayActions.length > 0 ? (
					todayActions.map((action: ActionType) => <Action key={action.id} action={action} />)
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
			</div>
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
					<div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
						{futureActions.map((action: ActionType) => (
							<Action key={action.id} action={action} />
						))}
					</div>
				</>
			)}
		</>
	);
}
