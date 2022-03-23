import {
	ActionFunction,
	LoaderFunction,
	useActionData,
	useLoaderData,
	useTransition,
} from "remix";
import ActionForm from "~/components/Forms/ActionForm";
import { handleActionDB } from "~/lib/handleActionDB.server";
import { getUserId } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";

export const action: ActionFunction = async ({ request }) => {
	return await handleActionDB(request);
};

export const loader: LoaderFunction = async ({ request, params }) => {
	let userId = await getUserId(request);
	let { id } = params;

	let data = await Promise.all([
		supabase.from("actions").select("*").eq("id", id).single(),
		supabase.from("profiles").select("*"),
		supabase
			.from("accounts")
			.select("*, actions(*)")
			.contains("user_id", [userId])
			.order("name"),
		supabase.from("campaigns").select("*"),
	]);

	let { data: action, error: error1 } = data[0];
	let { data: profiles, error: error2 } = data[1];
	let { data: accounts, error: error3 } = data[2];
	let { data: campaigns, error: error4 } = data[3];

	if (error1) throw new Error(error1.message);
	if (error2) throw new Error(error2.message);
	if (error3) throw new Error(error3.message);
	if (error4) throw new Error(error4.message);

	return { action, profiles, accounts, campaigns, params, userId };
};

export default function Action() {
	let { action, profiles, accounts, campaigns, userId } = useLoaderData();
	let actionData = useActionData();

	let transition = useTransition();
	let state = transition.state;
	let isAdding =
		transition.submission &&
		transition.submission.formData.get("action") === "new-action";
	return (
		<div className="px-4 py-6 lg:p-8">
			<ActionForm
				data={{
					accounts,
					actionData,
					profiles,
					userId: userId,
					campaigns,
				}}
				values={action}
				state={state}
				isAdding={isAdding}
				full={true}
			/>
			<div className="text-right">
				<button
					className="button button-primary"
					form="new_action"
					name="action"
					value="update"
				>
					Atualizar
				</button>
			</div>
		</div>
	);
}
