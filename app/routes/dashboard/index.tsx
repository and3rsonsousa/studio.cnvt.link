import dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import {
	ActionFunction,
	Form,
	LoaderFunction,
	useActionData,
	useLoaderData,
} from "remix";
import Action from "~/components/Action";
import AddAction from "~/components/AddAction";
import { isFuture, isLate } from "~/lib/functions";

import { handleActionDB } from "~/lib/handleActionDB.server";
import { getUserId } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";
import { AccountType, ActionType } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
	//Returns the user ID
	let userId = await getUserId(request);
	// Returns 'accounts'
	let { data: accounts } = await supabase
		.from("accounts")
		.select("*, actions(*)")
		.contains("user_id", [userId])
		.order("name");

	// Set 'actions' array and returns/flats the user_id's in accounts array
	// also set the 'actions' array with the values.
	let actions: ActionType[] = [];
	let account_ids: number[] = [];
	let user_ids =
		accounts
			?.map((account: AccountType) => {
				account.actions?.map((action) => {
					actions.push(action);
				});
				account_ids.push(account.id);
				return account.user_id;
			})
			.flat() || [];

	//Returns profiles
	let { data: profiles } = await supabase
		.from("profiles")
		.select("*")
		.in("user_id", user_ids)
		.order("name");

	let { data: campaigns } = await supabase
		.from("campaigns")
		.select("*")
		.in("account_id", account_ids)
		.order("name");

	//Order the actions by 'end' date
	actions = actions.sort((a, b) =>
		dayjs(a.start ? a.start : a.end).diff(b.start ? b.start : b.end)
	);

	return { profiles, accounts, actions, userId, campaigns };
};

export const action: ActionFunction = async ({ request }) => {
	return handleActionDB(request);
};

export default function DashboardIndex() {
	// let { profile } = useOutletContext<{ profile: ProfileType }>();
	let data = useLoaderData();
	let actionData = useActionData();
	let [showAddActionForm, set_showAddActionForm] = useState(false);
	let { profiles, accounts, actions, userId, campaigns } = data;
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
			<div className="page">
				{lateActions.length > 0 && (
					<>
						<Heading title="Em atraso" />
						<div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6">
							{lateActions
								.slice(0, 6)
								.map((action: ActionType) => (
									<Action key={action.id} action={action} />
								))}
						</div>
					</>
				)}
				<Heading title="Hoje" />
				<div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
					{todayActions.length > 0 ? (
						todayActions.map((action: ActionType) => (
							<Action key={action.id} action={action} />
						))
					) : (
						<div className="text-gray-400">
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
						<Heading title="Próximas" />
						<div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6">
							{futureActions.map((action: ActionType) => (
								<Action key={action.id} action={action} />
							))}
						</div>
					</>
				)}
				<div className="fixed bottom-8 right-8">
					<button
						onClick={() =>
							set_showAddActionForm(() => !showAddActionForm)
						}
						className="button-primary focus:ring-interdimensional/30 grid h-12 w-12 place-content-center rounded-full transition-all duration-300 focus:ring-4 active:translate-y-0.5"
					>
						<HiPlus
							className={`text-3xl transition duration-500 ${
								showAddActionForm ? "-rotate-45" : ""
							}`}
						/>
					</button>
				</div>
			</div>
			<AnimatePresence>
				{showAddActionForm && (
					<AddAction
						data={{
							accounts,
							profiles,
							userId,
							actionData,
							campaigns,
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
}

function Heading({ title }: { title: string }) {
	return (
		<div className="flex">
			<h3 className="text-gray-700">{title}</h3>
		</div>
	);
}
