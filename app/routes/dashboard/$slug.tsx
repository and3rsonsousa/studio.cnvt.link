import { LoaderFunction, Outlet, useLoaderData } from "remix";
import Action from "~/components/Action";
import { supabase } from "~/lib/supabase";
import { AccountType, ActionType } from "~/types";

export const loader: LoaderFunction = async ({ params }) => {
	let { slug } = params;

	let { data, error } = await supabase.from("accounts").select("*, actions(*)").match({ slug }).single();

	if (error) throw new Error(error.message);

	let account = data;

	account.actions = account.actions.map((action: ActionType) => ({
		...action,
		account: { ...account, action: null },
	}));

	return account;
};

// TODO: Mover as ações laterais para a pagina $id.tsx
// TODO: Inclur opção de Criação de Campanha direto na página

export default function Slug() {
	let account: AccountType = useLoaderData();
	return (
		<div>
			<div className="relative z-10 flex items-center justify-between border-b  bg-gray-50 px-4 py-6 lg:p-8">
				<h2 className="m-0 flex gap-2 text-gray-700">{account.name}</h2>
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
							account.actions.map((action, index) => <Action size="n" action={action} key={index} />)}
					</div>
				</div>
			</div>
		</div>
	);
}
