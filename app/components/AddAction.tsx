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
		setShowAddActionForm: React.Dispatch<React.SetStateAction<boolean>>;
	};
	full?: boolean;
};

export default function AddAction({
	data: {
		accounts,
		profiles,
		userId,
		actionData,
		campaigns,
		setShowAddActionForm,
	},
}: AddActionsProps) {
	let [largeForm, setLargeForm] = useState(false);
	let [shouldClose, setShouldClose] = useState(true);

	let transition = useTransition();
	let state = transition.state;
	let isAdding =
		transition.submission &&
		transition.submission.formData.get("action") === "create";

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
						setShowAddActionForm,
					}}
					full={largeForm}
					state={state}
					isAdding={isAdding}
					shouldClose={shouldClose}
				/>
				<br />
			</div>
			<div className="flex items-center justify-between gap-2 border-t p-4 md:px-6 ">
				<input
					type="checkbox"
					checked={shouldClose}
					onChange={() => setShouldClose(!shouldClose)}
				/>
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
