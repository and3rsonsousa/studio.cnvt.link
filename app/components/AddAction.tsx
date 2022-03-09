import { motion } from "framer-motion";
import { useState } from "react";
import { useTransition } from "remix";
import { Button } from "~/components/Forms";
import { popup } from "~/lib/animations";
import { AccountType, ICampaign, ProfileType } from "~/types";
import ActionForm from "./Forms/ActionForm";

export type AddActionsProps = {
	data: {
		accounts: AccountType[];
		profiles: ProfileType[];
		userId: string;
		actionData: any;
		campaigns: ICampaign[];
	};
	full?: boolean;
};

export default function AddAction({ data: { accounts, profiles, userId, actionData, campaigns } }: AddActionsProps) {
	let [largeForm, setLargeForm] = useState(false);

	let transition = useTransition();
	let state = transition.state;
	let isAdding = transition.submission && transition.submission.formData.get("action") === "new-action";

	return (
		<motion.div
			key="new_action"
			layout
			initial={popup.initial}
			animate={popup.animate}
			exit={popup.exit}
			className={`fixed right-4 bottom-24 z-40  flex max-h-[70vh] w-72 origin-bottom-right flex-col rounded-lg bg-white shadow-2xl shadow-gray-500/50 ring-1 ring-black/5 ${
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
				<button className="button button-small button-ghost" onClick={() => setLargeForm(() => !largeForm)}>
					{largeForm ? "Comprimir" : "Expandir"}
				</button>
				<Button form="new_action" text="Inserir" primary name="action" value="new-action" isAdding={isAdding} />
			</div>
		</motion.div>
	);
}
