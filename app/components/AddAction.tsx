import { motion } from "framer-motion";
import { useState } from "react";
import { useTransition } from "remix";
import { Button } from "~/components/Forms";
import { AccountType, CampaignType, ProfileType } from "~/types";
import ActionForm from "./Forms/ActionForm";

export type AddActionsProps = {
	data: {
		accounts: AccountType[];
		profiles: ProfileType[];
		userId: string;
		actionData: any;
		campaigns: CampaignType[];
	};
	full?: boolean;
};

export default function AddAction({
	data: { accounts, profiles, userId, actionData, campaigns },
}: AddActionsProps) {
	let [largeForm, setLargeForm] = useState(false);

	let transition = useTransition();
	let state = transition.state;
	let isAdding =
		transition.submission &&
		transition.submission.formData.get("action") === "new-action";

	return (
		<motion.div
			layout
			className={`flex max-h-[70vh] w-72  flex-col rounded-lg bg-white shadow-2xl shadow-gray-500/50 ring-1 ring-black/5 ${
				largeForm ? "md:w-[36rem]" : "md:w-96"
			}`}
		>
			<div className="flex justify-between border-b p-4 text-gray-700 md:px-6 ">
				<h4 className="mb-0">Nova Ação</h4>
			</div>
			<div className="overflow-y-auto overflow-x-visible px-4 md:px-6 ">
				<ActionForm
					data={{
						accounts,
						profiles,
						userId,
						actionData,
						campaigns,
					}}
					full={largeForm}
					state={state}
					isAdding={isAdding}
				/>
			</div>
			<div className="flex items-center justify-between gap-2 border-t p-4 md:px-6 ">
				<button
					className="button button-small button-ghost"
					onClick={() => setLargeForm(() => !largeForm)}
				>
					{largeForm ? "Comprimir" : "Expandir"}
				</button>
				<Button
					form="action_form"
					text="Inserir"
					primary
					isAdding={isAdding}
				/>
			</div>
		</motion.div>
	);
}
