import { useState } from "react";

import Display from "~/components/Display";
import { DialogActionForm } from "~/components/DialogActionForm";
import { getActionFormData, handleAction } from "~/lib/db.server";
import { getUserId } from "~/lib/session.server";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { useActionData, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
	//Returns the user ID
	let userId: string = await getUserId(request);
	let data = await getActionFormData(userId);
	// let url = request.url;

	return {
		userId,
		// url,
		...data,
	};
};

export const action: ActionFunction = async ({ request }) => {
	console.log({ url: request.url });

	return await handleAction(request);
};

export default function DashboardIndex() {
	let data = useLoaderData();
	let actionData = useActionData();
	let [showAddActionForm, setShowAddActionForm] = useState(false);
	let { profiles, accounts, actions, userId, campaigns } = data;

	return (
		<>
			<div className="page">
				<Display actions={actions} />

				<DialogActionForm
					showAddActionForm={showAddActionForm}
					setShowAddActionForm={setShowAddActionForm}
					accounts={accounts}
					profiles={profiles}
					userId={userId}
					actionData={actionData}
					campaigns={campaigns}
				/>
			</div>
		</>
	);
}
