import {
	ActionFunction,
	LoaderFunction,
	Outlet,
	useActionData,
	useLoaderData,
	useTransition,
} from "remix";
import db from "~/lib/db";
import { IAccount } from "~/types";
import ListItem from "~/components/ListItem";

export const loader: LoaderFunction = async () => {
	let { data: accounts } = await db.from("accounts").select().order("name");

	return { accounts };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	if (!formData.get("id")) throw new Error("Campo id vazio");

	let home = await db
		.from("home")
		.delete()
		.match({ account_id: formData.get("id") as string });

	let { data, error } = await db
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
		<div className="g-gray-100 flex min-h-screen w-full flex-col justify-start gap-16 xl:flex-row">
			<div className="mx-auto max-w-lg xl:mx-0 xl:w-96">
				<h3 className="text-gray-900">Contas</h3>
				{accounts.length ? (
					<div>
						{accounts.map((account: IAccount) => (
							<ListItem
								item={account}
								edit
								del
								model="accounts"
							/>
						))}
					</div>
				) : (
					<div className="text-sm text-gray-400">
						Nenhuma conta no sistema.
					</div>
				)}
			</div>

			<Outlet />
		</div>
	);
}
