import { ActionFunction, LoaderFunction, Outlet, useLoaderData } from "remix";
import { supabase } from "~/lib/supabase";
import { AccountType } from "~/types";
import ListItem from "~/components/ListItem";

export const loader: LoaderFunction = async () => {
	let { data: accounts, error } = await supabase
		.from("accounts")
		.select("*")
		.order("name");

	if (error) throw new Error(error.message);

	return { accounts };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	if (!formData.get("id")) throw new Error("Campo id vazio");

	let home = await supabase
		.from("home")
		.delete()
		.match({ account_id: formData.get("id") as string });

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
		<div className="g-gray-100 flex min-h-screen w-full flex-col justify-start gap-16 p-4 lg:flex-row">
			<Outlet />
			<div className="lg:order-1">
				<div className="mx-auto max-w-lg xl:mx-0 xl:w-96">
					<h3 className="text-gray-900">Clientes</h3>
					{accounts.length ? (
						<div>
							{accounts.map((account: AccountType) => (
								<ListItem
									item={account}
									edit
									del
									model="accounts"
									key={account.id}
								/>
							))}
						</div>
					) : (
						<div className="text-sm text-gray-400">
							Nenhum cliente casdastrado no sistema.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
