import {
	ActionFunction,
	Form,
	LoaderFunction,
	useActionData,
	useLoaderData,
} from "remix";
import { CheckBoxGroup, Input } from "~/components/Forms/Fields";
import { supabase } from "~/lib/supabase";

export const loader: LoaderFunction = async () => {
	let { data: profiles, error } = await supabase
		.from("profiles")
		.select()
		.order("name");
	console.log(profiles);

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

	let home = await supabase.from("home").insert({
		account_id: account.id,
	});

	return account;
};

export default function () {
	let { profiles } = useLoaderData();
	let actionData = useActionData();

	return (
		<div className="mx-auto max-w-lg lg:order-2 lg:m-0 xl:mx-0 xl:w-96">
			<h2 className="text-gray-900">Nova Conta</h2>
			{actionData?.account?.error && (
				<div className="error-banner-micro flex items-center gap-4">
					<div>{actionData.account.error.message}</div>
				</div>
			)}

			<Form method="post">
				<Input label="Nome" type="text" name="name" />
				<Input label="Slug" type="text" name="slug" />
				<CheckBoxGroup
					label="Usuários"
					name="user_id"
					items={profiles}
				/>
				<div className="mt-8 text-right">
					<button
						type="submit"
						className="button button-primary"
						name="_action"
						value="add"
					>
						Cadastrar
					</button>
				</div>
			</Form>
		</div>
	);
}
