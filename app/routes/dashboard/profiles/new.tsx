import { useEffect, useRef } from "react";
import { ActionFunction, Form, useActionData, useTransition } from "remix";
import { Button, Input } from "~/components/Forms";
import { supabase } from "~/lib/supabase";
import { ProfileType } from "~/types";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	let values = Object.fromEntries(formData);

	if (values.name === "" || values.password === "" || values.name === "") {
		return {
			auth: {
				error: {
					message: `Nenhum campo não pode ser em branco`,
				},
			},
		};
	}

	let auth = await supabase.auth.signUp({
		...values,
	});

	let profile: ProfileType;

	if (auth.user) {
		let { data, error } = await supabase
			.from("profiles")
			.insert({
				name: values.name,
				user_id: auth.user.id,
				email: values.email,
			})
			.single();

		if (error) throw new Error(error.message);

		profile = data;
		let home = await supabase.from("home").insert({
			profile_id: profile.id,
		});
		return { auth, profile, home };
	}

	return false;
};

export default function () {
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
		<div className="mx-auto max-w-lg lg:order-2 lg:m-0 xl:mx-0 xl:w-96">
			<h2 className="text-gray-900">Novo Usuário</h2>
			{actionData?.auth?.error && (
				<div className="error-banner-micro flex items-center gap-4">
					<div>{actionData.auth.error.message}</div>
				</div>
			)}

			<Form method="post" ref={formRef}>
				<Input label="Nome" name="name" type="text" />
				<Input label="E-mail" name="email" type="email" />
				<Input label="Senha" name="password" type="password" />

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
