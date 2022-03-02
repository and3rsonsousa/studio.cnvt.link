import {
	ActionFunction,
	Form,
	LoaderFunction,
	useActionData,
	useLoaderData,
} from "remix";
import { supabase } from "~/lib/supabase";
import { Input } from "~/components/Fields";
import { ProfileType } from "~/types";

export const loader: LoaderFunction = async ({ params }) => {
	let { data: profile, error } = await supabase
		.from("profiles")
		.select()
		.match({ id: params.id })
		.single();
	if (error) throw new Error(error.message);

	return { profile };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	let values = {
		name: formData.get("name") as string,
	};

	if (!values.name) {
		return {
			account: {
				error: {
					message: `Nenhum campo não pode ser em branco`,
				},
			},
		};
	}

	let { data: account, error } = await supabase
		.from("profiles")
		.update({
			name: values.name,
		})
		.eq("id", formData.get("id"))
		.single();

	if (error) throw new Error(error.message);

	return account;
};

export default function () {
	let { profile }: { profile: ProfileType } = useLoaderData();
	let actionData = useActionData();

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="mx-auto max-w-md p-8">
				<h2 className="text-gray-900">Editar Conta</h2>
				{actionData?.account?.error && (
					<div className="error-banner-micro flex items-center gap-4">
						<div>{actionData.account.error.message}</div>
					</div>
				)}
				<Form method="post">
					<Input
						label="Nome"
						type="text"
						name="name"
						value={profile.name}
					/>

					<div className="mt-8 text-right">
						<input name="id" value={profile.id} type="hidden" />
						<button type="submit" className="button button-primary">
							Atualizar
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}
