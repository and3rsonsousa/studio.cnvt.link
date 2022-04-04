import { DialogActionForm } from "~/components/DialogActionForm";
import Display from "~/components/Display";
import { LoaderFunction, useLoaderData, useActionData } from "remix";
import { getActionFormData } from "~/lib/db.server";
import { getUserId } from "~/lib/session.server";
import { ActionType } from "~/types";
import { useState } from "react";

export const loader: LoaderFunction = async ({ params, request }) => {
	// Slug do Cliente
	let { slug } = params;
	// Usuário logado
	let userId: string = await getUserId(request);
	let { accounts, ...data } = await getActionFormData(userId, slug);

	let account = accounts?.filter((account) => account.slug === slug)[0];

	return {
		userId,
		account,
		accounts,
		...data,
	};
};

export default function () {
	let { profiles, actions, accounts, userId, campaigns } = useLoaderData();
	let actionData = useActionData();
	let activeActions: Array<ActionType> = [];
	let accomplishedActions: Array<ActionType> = [];
	let [showAddActionForm, setShowAddActionForm] = useState(false);

	actions.map((action: ActionType) => {
		if (action.step_id !== 6) {
			activeActions.push(action);
		} else {
			accomplishedActions.push(action);
		}
		return null;
	});

	return (
		<>
			<Display actions={actions ?? []} />
			<DialogActionForm
				showAddActionForm={showAddActionForm}
				setShowAddActionForm={setShowAddActionForm}
				accounts={accounts}
				profiles={profiles}
				userId={userId}
				actionData={actionData}
				campaigns={campaigns}
			/>
		</>
	);
}
