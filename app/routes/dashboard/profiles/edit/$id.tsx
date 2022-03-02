import {
	ActionFunction,
	Form,
	LoaderFunction,
	useActionData,
	useLoaderData,
} from "remix";
import { supabase } from "~/lib/supabase";
import { CheckBoxGroup, Input } from "~/components/Forms/Fields";
import { AccountType, ProfileType } from "~/types";

export const loader: LoaderFunction = async ({ params }) => {
	let data = await Promise.all([
		supabase.from("accounts").select("*").order("name"),
		supabase.from("profiles").select().match({ id: params.id }).single(),
	]);

	let { data: accounts } = data[0];
	let { data: profile } = data[1];

	return { profile, accounts };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	let values = {
		id: formData.get("id") as string,
		user_id: formData.get("user_id") as string,
		name: formData.get("name") as string,
		accounts: formData.getAll("accounts") as string[],
	};

	if (!values.name) {
		return {
			profile: {
				error: {
					message: `Nenhum campo não pode ser em branco`,
				},
			},
		};
	}

	let { data: accounts, error } = await supabase
		.from("accounts")
		.select("*")
		.order("name");

	let accountsUpsert = accounts?.map((account: AccountType) => {
		//if accounts.user_id is not null and has this user_id
		// Caso o usuário esteja listado nessa conta
		if (
			account.user_id !== null &&
			account.user_id.find((id) => id === values.user_id)
		) {
			// Caso os id's das accounts não contenham o id da conta no loop
			// Caso o usuário vá ser removido
			if (
				values.accounts.filter((value) => value === String(account.id))
					.length === 0
			) {
				//retorna uma account sem o id do usuário
				//remove o usuário
				return {
					...account,
					user_id: account.user_id.filter(
						(id) => id !== values.user_id
					),
				};
			}

			return account;

			//if accounts.user_id is not null and the id of the account is listed in values.accounts
		} else if (
			values.accounts.find((value) => value === String(account.id))
		) {
			return {
				...account,
				user_id: account.user_id
					? [...account.user_id, values.user_id]
					: [values.user_id],
			};
		}
	});

	accountsUpsert = accountsUpsert?.filter((account) => account !== undefined);

	console.log(accountsUpsert);

	Promise.all([
		supabase
			.from("profiles")
			.update({
				name: values.name,
			})
			.eq("id", formData.get("id"))
			.single(),
		accountsUpsert != undefined
			? supabase.from("accounts").upsert(accountsUpsert)
			: null,
	]);

	return "data";
};

export default function () {
	let {
		profile,
		accounts,
	}: { profile: ProfileType; accounts: AccountType[] } = useLoaderData();
	let actionData = useActionData();

	return (
		<div className="lg:order-2">
			<div className="brick mx-auto max-w-lg p-8 lg:w-96">
				<h2 className="text-gray-900">Editar Usuário</h2>
				{actionData?.data?.error && (
					<div className="error-banner-micro flex items-center gap-4">
						<div>{actionData.account.error.message}</div>
					</div>
				)}
				<Form method="post">
					<input name="id" value={profile.id} type="hidden" />
					<input
						type="hidden"
						name="user_id"
						defaultValue={profile.user_id}
					/>
					<Input
						label="Nome"
						type="text"
						name="name"
						value={profile.name}
					/>

					<CheckBoxGroup
						label="Clientes"
						name="accounts"
						values={accounts}
						value="id"
						selected={[profile.user_id]}
					/>

					<div className="mt-8 text-right">
						<button type="submit" className="button button-primary">
							Atualizar
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}
