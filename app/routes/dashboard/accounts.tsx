import { ActionFunction, LoaderFunction, Outlet, useFetcher, useLoaderData, useTransition } from "remix";
import { supabase } from "~/lib/supabase";
import { AccountType } from "~/types";
import ListItem from "~/components/ListItem";
import { useEffect } from "react";

export const loader: LoaderFunction = async () => {
	let { data: accounts, error } = await supabase.from("accounts").select("*").order("name");

	if (error) throw new Error(error.message);

	return { accounts };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	if (!formData.get("id")) throw new Error("Campo id vazio");

	let { data, error } = await supabase
		.from("accounts")
		.delete()
		.match({
			id: formData.get("id") as string,
		})
		.single();

	if (error) throw new Error(error.message);

	return data;
};

export default function () {
	let { accounts } = useLoaderData();

	return (
		<div className="p-8 lg:flex lg:gap-16">
			<div className="mx-auto mb-16 w-full max-w-sm lg:order-2 lg:m-0">
				<Outlet />
			</div>

			<div className="mx-auto w-full max-w-sm lg:order-1 lg:m-0">
				<h3 className="text-gray-900">Clientes</h3>
				{accounts.length ? (
					<div>
						{accounts.map((account: AccountType) => (
							<ListItem item={account} edit del model="accounts" key={account.id} />
						))}
					</div>
				) : (
					<div className="text-sm text-gray-400">Nenhum cliente casdastrado no sistema.</div>
				)}
			</div>
		</div>
	);
}
