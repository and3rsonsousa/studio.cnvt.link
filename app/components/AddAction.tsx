import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiExpand, BiCollapse } from "react-icons/bi";
import { Form } from "remix";
import { Input, RadioGroup, SelectField } from "~/components/Fields";
import { popup } from "~/lib/animations";
import { flows, steps, tags } from "~/lib/data";
import { IAccount, ICampaign, IProfile } from "~/types";

type AddActionsProps = {
	data: {
		accounts: IAccount[];
		profiles: IProfile[];
		userId: string;
		actionData: any;
		campaigns: ICampaign[];
	};
};

export default function ({
	data: { accounts, profiles, userId, actionData, campaigns },
}: AddActionsProps) {
	let [largeForm, setLargeForm] = useState(false);
	let today = dayjs();
	return (
		<motion.div
			key="new_action"
			layout
			initial={popup.initial}
			animate={popup.animate}
			exit={popup.exit}
			className={`fixed right-4 bottom-24 max-h-[80vh] ${
				largeForm ? "md:top-16" : "md:top-auto"
			} z-40 flex w-72 origin-bottom-right flex-col rounded-lg bg-white shadow-xl shadow-gray-500/20 ${
				largeForm ? "md:w-[36rem]" : "md:w-96"
			}`}
		>
			<div className="flex justify-between border-b p-4 text-gray-700 md:px-6 ">
				<h4 className="mb-0">Nova Ação</h4>
				<button
					className="text-gray-300 transition hover:text-gray-500 active:text-gray-700"
					onClick={() => setLargeForm(() => !largeForm)}
				>
					{largeForm ? (
						<BiCollapse className="text-xl" />
					) : (
						<BiExpand className="text-xl" />
					)}
				</button>
			</div>
			<div className="overflow-y-auto overflow-x-visible px-4 md:px-6 ">
				<Form method="post" name="new_action" id="new_action">
					{/* Usuário que está criando */}
					<input type="hidden" value={userId} name="created_by" />
					{actionData?.error ? (
						<div className="error-banner-micro mt-8">
							{actionData.error.message}
						</div>
					) : null}
					<div className={largeForm ? "" : "hidden"}>
						<SelectField
							label="campaign_id"
							values={campaigns}
							name="Campanha"
						/>
					</div>
					<Input label="Título" name="name" type="text" />

					<div className={largeForm ? "" : "hidden"}>
						<Input
							label="Descrição"
							name="description"
							type="textarea"
						/>
					</div>

					<motion.div layout>
						<RadioGroup
							label="Cliente"
							name="account_id"
							values={accounts}
							columns={largeForm ? 3 : 2}
						/>
					</motion.div>

					<div className={largeForm ? "" : "hidden"}>
						<RadioGroup
							label="Responsável"
							name="user_id"
							values={profiles}
							selected={userId}
							columns={largeForm ? 3 : 2}
						/>
						<RadioGroup
							label="Fluxo"
							name="flow_id"
							values={flows}
							selected={1}
							columns={largeForm ? 3 : 2}
						/>
						<RadioGroup
							label="Status"
							name="status_id"
							values={steps}
							selected={1}
							columns={largeForm ? 3 : 2}
						/>
						<RadioGroup
							label="Tags"
							name="tag_id"
							values={tags}
							selected={1}
							columns={largeForm ? 3 : 2}
						/>
					</div>

					<div
						className={`${
							largeForm ? "grid gap-4 md:grid-cols-2" : ""
						}`}
					>
						<div className={largeForm ? "" : "hidden"}>
							<Input
								label="Data de Inicio"
								name="start"
								type="date"
								value={today.format("YYYY-MM-DD")}
							/>
						</div>

						<motion.div layout>
							<Input
								label="Data"
								name="end"
								type="datetime-local"
								value={today
									.add(1, "hour")
									.format("YYYY-MM-DD[T]HH:mm")}
							/>
						</motion.div>
					</div>
					<br />
				</Form>
			</div>
			<div className="flex justify-end gap-2 border-t p-4 md:px-6 ">
				<button
					className="button button-primary"
					form="new_action"
					type="submit"
				>
					Inserir
				</button>
			</div>
		</motion.div>
	);
}
