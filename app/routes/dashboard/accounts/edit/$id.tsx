import { ActionFunction, Form, LoaderFunction, redirect, useActionData, useLoaderData } from "remix";
import { CheckboxGroup, Input } from "~/components/Forms";
import { supabase } from "~/lib/supabase";
import { AccountType, ProfileType } from "~/types";

export const loader: LoaderFunction = async ({ params }) => {
	let data = await Promise.all([
		supabase.from("accounts").select().match({ id: params.id }).single(),
		supabase.from("profiles").select(),
	]);

	let { data: account, error: error1 } = data[0];
	let { data: profiles, error: error2 } = data[1];

	if (error1) throw new Error(error1.message);
	if (error2) throw new Error(error2.message);

	return { account, profiles };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	let values = {
		name: formData.get("name") as string,
		slug: formData.get("slug") as string,
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
		.update({
			name: values.name,
			slug: values.slug,
			user_id: values.user_id,
		})
		.eq("id", formData.get("id"))
		.single();

	if (error) throw new Error(error.message);

	return redirect("/dashboard/accounts");
};

export default function () {
	let { account, profiles }: { account: AccountType; profiles: ProfileType[] } = useLoaderData();
	let actionData = useActionData();

	return (
		<div className="lg:order-2">
			<div className="min-h-screen bg-gray-100">
				<div className="mx-auto max-w-md">
					<h2 className="text-gray-900">Editar Conta</h2>
					{actionData?.account?.error && (
						<div className="error-banner-micro flex items-center gap-4">
							<div>{actionData.account.error.message}</div>
						</div>
					)}
					<Form method="post">
						<Input label="Nome" type="text" name="name" value={account.name} />
						<Input label="Slug" type="text" name="slug" value={account.slug} />
						<CheckboxGroup
							label="Usuários"
							name="user_id"
							items={profiles.map((profile) => ({
								id: profile.id,
								name: profile.name,
								value: profile.user_id,
							}))}
							selected={account.user_id}
						/>
						<div className="mt-8 text-right">
							<input name="id" value={account.id} type="hidden" />
							<button type="submit" className="button button-primary">
								Atualizar
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
