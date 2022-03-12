import dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { ActionFunction, LoaderFunction, useActionData, useLoaderData } from "remix";
import AddAction from "~/components/AddAction";
import Display from "~/components/Display";
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
					actions.push({ ...action, account });
				});
				account_ids.push(account.id);
				return account.user_id;
			})
			.flat() || [];

	//Returns profiles
	let { data: profiles } = await supabase.from("profiles").select("*").in("user_id", user_ids).order("name");

	let { data: campaigns } = await supabase.from("campaigns").select("*").in("account_id", account_ids).order("name");

	//Order the actions by 'end' date
	actions = actions.sort((a, b) => dayjs(a.start ? a.start : a.end).diff(b.start ? b.start : b.end));

	actions = actions.map((action) => ({
		...action,
		campaign: campaigns?.filter((campaign) => campaign.id === action.campaign_id)[0],
	}));

	return {
		profiles,
		accounts,
		actions,
		userId,
		campaigns,
	};
};

export const action: ActionFunction = async ({ request }) => {
	return await handleActionDB(request);
};

export default function DashboardIndex() {
	// let { profile } = useOutletContext<{ profile: ProfileType }>();
	let data = useLoaderData();
	let actionData = useActionData();
	let [showAddActionForm, setShowAddActionForm] = useState(false);
	let { profiles, accounts, actions, userId, campaigns } = data;

	return (
		<>
			<div className="page">
				<Display actions={actions} setShowAddActionForm={setShowAddActionForm} />
				<div className="fixed bottom-8 right-8">
					<button
						onClick={() => setShowAddActionForm(() => !showAddActionForm)}
						className="button-primary focus:ring-interdimensional/30 grid h-12 w-12 place-content-center rounded-full transition-all duration-300 focus:ring-4 active:translate-y-0.5"
					>
						<HiPlus
							className={`text-3xl transition duration-500 ${showAddActionForm ? "-rotate-45" : ""}`}
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
