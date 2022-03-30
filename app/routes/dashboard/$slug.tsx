import { useState } from "react";
import {
	ActionFunction,
	LoaderFunction,
	Outlet,
	useActionData,
	useLoaderData,
} from "remix";
import Action from "~/components/Action";
import Display from "~/components/Display";
import { AccountName } from "~/components/Display/Header";
import { DisplayActionForm } from "~/components/DisplayActionForm";
import { getActionFormData, handleAction } from "~/lib/db.server";
import { getUserId } from "~/lib/session.server";
import { ActionType } from "~/types";

export const loader: LoaderFunction = async ({ params, request }) => {
	// Slug do Cliente
	let { slug } = params;
	// Usuário logado
	let userId: string = await getUserId(request);
	let { accounts, ...data } = await getActionFormData(userId, slug);

	let account = accounts?.filter((account) => account.slug === slug)[0];

	return {
		params,
		userId,
		account,
		accounts,
		...data,
	};
};

export const action: ActionFunction = async ({ request }) => {
	return await handleAction(request);
};

export default function Slug() {
	let { account, params, profiles, actions, accounts, userId, campaigns } =
		useLoaderData();
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
		<div>
			{params.id !== undefined ? (
				<>
					<div className="relative z-10 flex w-full items-center justify-between  border-b bg-white px-4 py-6 lg:p-8">
						<AccountName account={account} />
					</div>
					<div className="xl:flex">
						<Outlet />

						<div className="px-4 py-6 xl:w-80 xl:py-8 xl:pl-0 xl:pr-8">
							<div className="mb-4 space-y-1 border-b pb-4">
								<h4 className="text-gray-700">Informações</h4>
								<div>
									{account.actions!.length > 0
										? account.actions?.length === 1
											? "Uma ação cadastrada"
											: account.actions?.length +
											  " ações cadastradas"
										: "Nenhuma ação para este cliente"}
								</div>
								<div className="text-xx uppercase tracking-wide text-gray-400">
									<div>
										{activeActions!.length > 0
											? activeActions?.length === 1
												? "Uma ação a fazer"
												: activeActions?.length +
												  " ações a serem concluídas"
											: ""}
									</div>
									<div>
										{accomplishedActions!.length > 0
											? accomplishedActions?.length === 1
												? "Uma ação concluída"
												: accomplishedActions?.length +
												  " ações concluídas"
											: ""}
									</div>
								</div>
							</div>
							<h4 className="text-gray-700">Outras Ações</h4>
							<div className="grid gap-2 md:grid-cols-2 xl:grid-cols-1">
								{activeActions &&
									activeActions.map((action, index) => (
										<Action action={action} key={index} />
									))}
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<Display actions={actions ?? []} />
					<DisplayActionForm
						showAddActionForm={showAddActionForm}
						setShowAddActionForm={setShowAddActionForm}
						accounts={accounts}
						profiles={profiles}
						userId={userId}
						actionData={actionData}
						campaigns={campaigns}
					/>
				</>
			)}
		</div>
	);
}
