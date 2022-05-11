import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import {
	Form,
	useActionData,
	useLoaderData,
	useTransition,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Button, CheckboxGroup, Input } from "~/components/Forms/";
import { supabase } from "~/lib/supabase";
import type { ProfileType } from "~/types";

export const loader: LoaderFunction = async () => {
	let { data: profiles, error } = await supabase
		.from("profiles")
		.select("*")
		.order("name");

	if (error) throw new Error(error.message);

	return { profiles };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	let values = {
		name: formData.get("name"),
		slug: formData.get("slug"),
		user_id: formData.getAll("user_id"),
	};

	if (!values.name || !values.slug) {
		return {
			account: {
				error: {
					message: `Nenhum campo não pode ser em branco`,
				},
			},
		};
	}

	let { data: account, error } = await supabase
		.from("accounts")
		.insert({
			...values,
		})
		.single();

	if (error) throw new Error(error.message);

	// let home = await supabase.from("home").insert({
	// 	account_id: account.id,
	// });

	return account;
};

export default function () {
	let { profiles } = useLoaderData<{ profiles: ProfileType[] }>();
	let actionData = useActionData();
	let transition = useTransition();
	let state = transition.state;
	let isAdding =
		transition.submission &&
		transition.submission.formData.get("action") === "create";
	let formRef = useRef<null | HTMLFormElement>(null);

	useEffect(() => {
		if (isAdding) {
			formRef.current?.reset();
		}
	}, [state]);

	return (
		<div className="section">
			<h2 className="text-gray-900">Nova Conta</h2>
			{actionData?.account?.error && (
				<div className="error-banner-micro flex items-center gap-4">
					<div>{actionData.account.error.message}</div>
				</div>
			)}

			<Form method="post" ref={formRef}>
				<Input label="Nome" type="text" name="name" />
				<Input label="Slug" type="text" name="slug" />
				<CheckboxGroup
					label="Usuários"
					name="user_id"
					items={profiles.map((profile) => ({
						id: profile.id,
						name: profile.name,
						value: profile.user_id,
					}))}
				/>
				<div className="mt-8 text-right">
					<Button
						text="Cadastrar"
						isAdding={isAdding}
						primary
						name="action"
						value="create"
					/>
				</div>
			</Form>
		</div>
	);
}
