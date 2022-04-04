import { motion } from "framer-motion";
import { useState } from "react";
import { useTransition } from "remix";
import { Button } from "~/components/Forms";
import { AccountType, CampaignType, ProfileType } from "~/types";
import ActionForm from "./Forms/ActionForm";
import { FaCompress, FaExpand } from "react-icons/fa";

export type AddActionsProps = {
	data: {
		accounts: AccountType[];
		profiles: ProfileType[];
		userId: string;
		actionData: any;
		campaigns: CampaignType[];
		setShowAddActionForm?: React.Dispatch<React.SetStateAction<boolean>>;
	};
	full?: boolean;
};

export default function AddAction({
	data: { accounts, profiles, userId, actionData, campaigns },
}: AddActionsProps) {
	let [largeForm, setLargeForm] = useState(false);

	let transition = useTransition();
	let isAdding =
		transition.submission &&
		transition.submission.formData.get("action") === "create";

	return (
		<motion.div
			layout
			className={`flex max-h-[80vh] w-72  flex-col rounded-lg bg-white shadow-2xl shadow-gray-500/50 ring-1 ring-black/5 md:w-[36rem]`}
		>
			<div className="flex items-center justify-between border-b p-4 text-gray-700 md:px-6 ">
				<h4 className="mb-0">Nova Ação</h4>
				<button
					className="button button-icon button-small button-ghost -mr-2"
					onClick={() => setLargeForm(() => !largeForm)}
				>
					{largeForm ? <FaCompress /> : <FaExpand />}
				</button>
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
					isAdding={isAdding}
				/>
				<br />
			</div>
			<div className="flex items-center justify-end gap-2 border-t p-4 md:px-6 ">
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
