import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { Form } from "remix";
import { flows, steps, tags } from "~/lib/data";
import { ActionType } from "~/types";
import { Input, RadioGroup, SelectField, AutoComplete } from ".";
import { AddActionsProps } from "../AddAction";

// TODO: Adicionar campanha

export default function ({
	data: { userId, accounts, campaigns, actionData, profiles },
	full,
	isAdding,
	state,
	values,
}: AddActionsProps & {
	state: string;
	isAdding?: boolean;
	values?: ActionType;
}) {
	let today = dayjs();
	let [accountID, setAccountID] = useState(values ? values.account_id : null);
	let formRef = useRef<null | HTMLFormElement>(null);
	let isEditing = !!values?.id;
	let _campaigns = isEditing
		? campaigns.filter(
				(campaign) => campaign.account_id === values?.account_id
		  )
		: campaigns;
	let _account = values
		? accounts.filter((account) => account.id === values?.account_id)[0]
		: null;
	let _profiles = accountID
		? profiles.filter((profile) =>
				_account
					? _account.user_id.filter(
							(user_id) => user_id === profile.user_id
					  ).length > 0
					: true
		  )
		: profiles;

	useEffect(() => {
		if (isAdding) {
			formRef.current?.reset();
		}
	}, [state]);

	return (
		<Form method="post" name="new_action" id="new_action" ref={formRef}>
			{/* Usuário que está criando */}
			{!isEditing ? (
				<input type="hidden" value={userId} name="created_by" />
			) : null}

			{isEditing && <input type="hidden" value={values?.id} name="id" />}
			{actionData?.error ? (
				<div className="error-banner mt-8">
					{actionData.error.message}
				</div>
			) : null}
			<Input
				label="Título"
				name="name"
				type="text"
				value={values ? values.name : ""}
			/>
			{full && (
				<>
					<AutoComplete
						label="Campanha"
						name="campaign_id"
						items={_campaigns}
						selected={values ? values.campaign_id : undefined}
						after={(value) => {
							return (
								<button className="button button-small button-ghost">
									CRIAR
								</button>
							);
						}}
					/>

					<Input
						label="Descrição"
						name="description"
						type="textarea"
						value={values ? values.description : ""}
					/>
				</>
			)}

			{/* TODO: Incluir opção que não está na lista */}

			<AutoComplete
				label="Cliente"
				name="account_id"
				items={accounts.map((account) => ({
					id: account.id,
					name: account.name,
				}))}
				selected={values ? values.account_id : undefined}
				form="add-account"
			/>

			{/* <Form method="post" name="add-account" id="add-account"></Form> */}

			{full ? (
				<>
					<RadioGroup
						label="Responsável"
						name="user_id"
						items={_profiles.map((profile) => ({
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
						value={
							values?.start
								? dayjs(values?.start).format("YYYY-MM-DD")
								: today.format("YYYY-MM-DD")
						}
						disable={!values?.start}
					/>
				)}

				<Input
					label="Data"
					name="end"
					type="datetime-local"
					value={
						values?.end ??
						today.add(1, "hour").format("YYYY-MM-DD[T]HH:mm")
					}
					before={(value) => (
						<div className="w-16 pl-4 text-sm font-semibold uppercase text-gray-700">
							{dayjs(value).format("ddd")}
						</div>
					)}
				/>
			</div>
			<br />
		</Form>
	);
}
