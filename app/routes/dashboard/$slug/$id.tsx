import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import {
	Form,
	useActionData,
	useLoaderData,
	useTransition,
} from "@remix-run/react";
import { AccountName } from "~/components/Display/Header";
import { Button } from "~/components/Forms";
import ActionForm from "~/components/Forms/ActionForm";
import { handleAction } from "~/lib/db.server";
import { getUserId } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";
import type { AccountType } from "~/types";

export const action: ActionFunction = async ({ request, params }) => {
	let data = await handleAction(request);

	return data;
};

export const loader: LoaderFunction = async ({ request, params }) => {
	let userId = await getUserId(request);
	let { id } = params;

	let [
		{ data: action, error: error1 },
		{ data: profiles, error: error2 },
		{ data: accounts, error: error3 },
		{ data: campaigns, error: error4 },
	] = await Promise.all([
		supabase.from("actions").select("*, accounts(*)").eq("id", id).single(),
		supabase.from("profiles").select("*"),
		supabase
			.from("accounts")
			.select("*, actions(*)")
			.contains("user_id", [userId])
			.order("name"),
		supabase.from("campaigns").select("*"),
	]);

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

	let isAdding =
		transition.submission &&
		transition.submission.formData.get("action") === "update";

	let account: AccountType = action.accounts;

	return (
		<>
			<div className="relative z-10 flex w-full items-center justify-between  border-b bg-white px-4 py-6 lg:p-8">
				<AccountName account={account} />
			</div>
			<div className="xl:flex">
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
						isAdding={isAdding}
						full={true}
					/>
					<div className="mt-8 flex justify-end gap-2">
						<Form method="post">
							<input type="hidden" name="id" value={action.id} />
							<input type="hidden" name="action" value="delete" />
							<input
								type="hidden"
								name="backTo"
								value={`/dashboard/${account.slug}`}
							/>
							<Button text="Deletar" />
						</Form>
						<Button
							form="action_form"
							text="Atualizar"
							primary
							isAdding={isAdding}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
