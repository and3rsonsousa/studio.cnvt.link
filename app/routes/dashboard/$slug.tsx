import { ActionFunction, LoaderFunction, Outlet, useLoaderData } from "remix";
import Action from "~/components/Action";
import Display from "~/components/Display";
import { AccountName } from "~/components/Display/Header";
import { handleActionDB } from "~/lib/handleActionDB.server";
import { getUserId } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";
import { AccountType, ActionType } from "~/types";

export const loader: LoaderFunction = async ({ params, request }) => {
	// Slug do Cliente
	let { slug } = params;
	// Usuário logado
	let userId = await getUserId(request);

	// id e user_id das contas que o usuário logado pode acessar
	let { data: accounts } = await supabase
		.from("accounts")
		.select("id, user_id")
		.contains("user_id", [userId])
		.order("name");

	// accounts_ids e user_id
	let account_ids: number[] = [];
	let user_ids =
		accounts
			?.map((account: AccountType) => {
				account_ids.push(account.id);
				return account.user_id;
			})
			.flat() || [];

	// Retorna os Perfis, as campanhas e a conta do slug
	let data = await Promise.all([
		supabase.from("profiles").select("*").in("user_id", user_ids).order("name"),
		supabase.from("campaigns").select("*").in("account_id", account_ids).order("name"),
		supabase.from("accounts").select("*, actions(*)").match({ slug }).single(),
	]);

	let { data: profiles } = data[0];
	let { data: campaigns } = data[1];
	let { data: account } = data[2];

	// Configura as ações da conta com os dados retornados
	// TODO: Refatorar e unificar os código de $slug.tsx e dashboard/index.tsx
	// Seria melhor usar GraphQL

	account.actions = account.actions.map((action: ActionType) => ({
		...action,
		account: { ...account, action: null },
		campaign: campaigns?.filter((campaign) => campaign.id === action.campaign_id)[0],
		profile: profiles?.filter((profile) => profile.user_id === action.user_id)[0],
	}));

	console.log({ user_ids, profiles });

	return { account, params };
};

// TODO: Mover as ações laterais para a pagina $id.tsx
// TODO: Inclur opção de Criação de Campanha direto na página

export const action: ActionFunction = async ({ request }) => {
	return await handleActionDB(request);
};

export default function Slug() {
	let { account, params }: { account: AccountType; params: any } = useLoaderData();
	return (
		<div>
			{params.id !== undefined ? (
				<>
					<div className="relative z-10 flex w-full items-center justify-between  border-b bg-white px-4 py-6 lg:p-8">
						<AccountName account={account} />
					</div>
					<div className="lg:flex">
						<Outlet />

						<div className="px-4 py-6 lg:w-80 lg:py-8 lg:pl-0 lg:pr-8">
							<h4 className="text-gray-700">Informações</h4>
							<div className="mb-4 border-b pb-4">
								{account.actions!.length > 0
									? account.actions?.length === 1
										? "Uma ação cadastrada"
										: account.actions?.length + " ações cadastradas"
									: "Nenhuma ação para este cliente"}
							</div>
							<h4 className="text-gray-700">Outras Ações</h4>
							<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-1">
								{account.actions &&
									account.actions.map((action, index) => <Action action={action} key={index} />)}
							</div>
						</div>
					</div>
				</>
			) : (
				<Display actions={account.actions ?? []} />
			)}
		</div>
	);
}
