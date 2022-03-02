import { ActionFunction, Form, useActionData } from "remix";
import { Input } from "~/components/Forms/Fields";
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

	return (
		<div className="mx-auto max-w-lg xl:mx-0 xl:w-96">
			<h2 className="text-gray-900">Novo Usuário</h2>
			{actionData?.auth?.error && (
				<div className="error-banner-micro flex items-center gap-4">
					<div>{actionData.auth.error.message}</div>
				</div>
			)}

			<Form method="post">
				<Input label="Nome" name="name" type="text" />
				<Input label="E-mail" name="email" type="email" />
				<Input label="Senha" name="password" type="password" />

				<div className="mt-8 text-right">
					<button type="submit" className="button button-primary">
						Cadastrar
					</button>
				</div>
			</Form>
		</div>
	);
}
