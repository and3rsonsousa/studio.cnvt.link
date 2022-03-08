import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { Form } from "remix";
import { flows, steps, tags } from "~/lib/data";
import { ActionType } from "~/types";
import { Input, RadioGroup, SelectField } from ".";
import { AddActionsProps } from "../AddAction";

export default function ({
	data: { userId, accounts, campaigns, actionData, profiles },
	full,
	isAdding,
	state,
	values,
}: AddActionsProps & { state: string; isAdding?: boolean; values?: ActionType }) {
	let today = dayjs();
	let formRef = useRef<null | HTMLFormElement>(null);

	// console.log(campaigns);

	useEffect(() => {
		if (isAdding) {
			formRef.current?.reset();
		}
	}, [state]);

	return (
		<Form method="post" name="new_action" id="new_action" ref={formRef}>
			{/* Usuário que está criando */}
			{!values ? <input type="hidden" value={userId} name="created_by" /> : null}

			{values && <input type="hidden" value={values.id} name="id" />}
			{actionData?.error ? <div className="error-banner mt-8">{actionData.error.message}</div> : null}
			<Input label="Título" name="name" type="text" value={values ? values.name : ""} />
			{full && (
				<>
					<SelectField
						label="campaign_id"
						values={campaigns}
						name="Campanha"
						selected={values ? values.campaign_id : undefined}
					/>

					<Input label="Descrição" name="description" type="textarea" />
				</>
			)}

			<RadioGroup
				label="Cliente"
				name="account_id"
				items={accounts.map((account) => ({
					id: account.id,
					name: account.name,
				}))}
				columns={full ? 3 : 2}
				selected={values ? values.account_id : undefined}
			/>

			{full ? (
				<>
					<RadioGroup
						label="Responsável"
						name="user_id"
						items={profiles.map((profile) => ({
							id: profile.id,
							name: profile.name,
							value: profile.user_id,
						}))}
						selected={values ? values.user_id : userId}
						columns={full ? 3 : 2}
					/>
					<RadioGroup
						label="Fluxo"
						name="flow_id"
						items={flows.map((flow) => ({
							id: flow.id,
							name: flow.name,
							extra: flow.slug,
						}))}
						selected={values ? values.flow_id : 1}
						columns={full ? 3 : 2}
					/>
					<RadioGroup
						label="Status"
						name="step_id"
						items={steps.map((step) => ({
							id: step.id,
							name: step.name,
						}))}
						selected={values ? values.step_id : 1}
						columns={full ? 3 : 2}
					/>
					<RadioGroup
						label="Tags"
						name="tag_id"
						items={tags.map((tag) => ({
							id: tag.id,
							name: tag.name,
						}))}
						selected={values ? values.tag_id : 1}
						columns={full ? 3 : 2}
					/>
				</>
			) : (
				<input type="hidden" value={userId} name="user_id" />
			)}

			<div className={`${full ? "grid gap-4 md:grid-cols-2" : ""}`}>
				{full && (
					<Input
						label="Data de Início"
						name="start"
						type="date"
						value={today.format("YYYY-MM-DD")}
						disable={true}
					/>
				)}

				<Input
					label="Data"
					name="end"
					type="datetime-local"
					value={today.add(1, "hour").format("YYYY-MM-DD[T]HH:mm")}
				/>
			</div>
			<br />
		</Form>
	);
}
