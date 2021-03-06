import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { fade, popup } from "~/lib/animations";
import { AccountType, CampaignType, ProfileType } from "~/types";
import AddAction from "./AddAction";

export function DialogActionForm({
	showAddActionForm,
	setShowAddActionForm,
	accounts,
	account /* para ser usado quando  estiver em uma página de cliente */,
	profiles,
	userId,
	actionData,
	campaigns,
}: {
	showAddActionForm: boolean;
	setShowAddActionForm: React.Dispatch<React.SetStateAction<boolean>>;
	accounts: Array<AccountType>;
	account?: AccountType;
	profiles: Array<ProfileType>;
	userId: string;
	actionData: any;
	campaigns: Array<CampaignType>;
}) {
	useEffect(() => {
		function keyDown(event: KeyboardEvent) {
			if (
				(event.ctrlKey || event.metaKey) &&
				event.key === "k" &&
				!event.shiftKey
			) {
				setShowAddActionForm(() => !showAddActionForm);
			}
		}
		window.addEventListener("keydown", keyDown);

		return () => window.removeEventListener("keydown", keyDown);
	}, [showAddActionForm, setShowAddActionForm]);
	return (
		<>
			<div className="fixed bottom-4 right-4">
				<button
					onClick={() =>
						setShowAddActionForm(() => !showAddActionForm)
					}
					className="button-primary grid h-12 w-12 place-content-center rounded-full shadow-lg shadow-brand-500/50 transition-all duration-300 focus:ring-4 focus:ring-brand-700/30 active:translate-y-0.5"
				>
					<HiPlus
						className={`text-3xl transition duration-500 ${
							showAddActionForm ? "-rotate-45" : ""
						}`}
					/>
				</button>
			</div>
			<AnimatePresence>
				{showAddActionForm && (
					<Dialog
						static={true}
						open={showAddActionForm}
						onClose={() => setShowAddActionForm(false)}
						as={motion.div}
						className="fixed inset-0 z-[100] grid place-content-center overflow-y-auto"
					>
						<Dialog.Overlay
							as={motion.div}
							initial={fade.initial}
							animate={fade.animate}
							exit={fade.exit}
							className="fixed inset-0 bg-gray-500/20 backdrop-blur"
						/>
						<motion.div
							initial={popup.initial}
							animate={popup.animate}
							exit={popup.exit}
							key="newaction"
							className="relative"
						>
							<AddAction
								data={{
									accounts,
									profiles,
									userId,
									actionData,
									campaigns,
									setShowAddActionForm: setShowAddActionForm,
								}}
							/>
						</motion.div>
					</Dialog>
				)}
			</AnimatePresence>
		</>
	);
}
