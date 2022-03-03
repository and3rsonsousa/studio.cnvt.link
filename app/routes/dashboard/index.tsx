import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LoaderFunction, useLoaderData, useOutletContext } from "remix";
import AddAction from "~/components/AddAction";
import { getUserId } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";
import { AccountType, ActionType, ProfileType } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
	let userId = await getUserId(request);
	let { data: accounts } = await supabase
		.from("accounts")
		.select("*, actions(*)")
		.contains("user_id", [userId]);

	let user_ids = accounts?.map((account) => account.user_id).flat() || [];
	let actions:ActionType = 

	let { data: profiles } = await supabase
		.from("profiles")
		.select("*")
		.in("user_id", user_ids);

	return { profiles, accounts };
};
export default function () {
	let data = useLoaderData();
	let { profile, accounts } =
		useOutletContext<{ profile: ProfileType; accounts: AccountType[] }>();
	let [showAddActionForm, set_showAddActionForm] = useState(false);

	return (
		<>
			<div className="page">
				<Heading title="Em atraso" />
				<pre>{JSON.stringify(data, null, 2)}</pre>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Harum, omnis nostrum! Blanditiis quibusdam dolorum nemo at
					harum ratione ipsum incidunt. Magnam ipsum itaque ad nisi
					unde ea ratione deserunt sit!
				</p>
				<Heading title="Hoje" />
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Assumenda sed adipisci veritatis velit, et facere blanditiis
					inventore maiores minus harum natus minima possimus vero
					dignissimos architecto totam doloremque alias error.
				</p>
				<Heading title="Próximas" />
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Eaque, tenetur, aspernatur consequuntur minima sequi ipsam
					sit dicta doloremque tempore eos iusto ad ducimus debitis
					nisi vitae nobis inventore. Quaerat, id?
				</p>
			</div>
			{/* <AnimatePresence>
				{showAddActionForm && (
					<AddAction
						data={{
							accounts,
							profiles,
							userId,
							actionData,
							campaigns,
						}}
					/>
				)}
			</AnimatePresence> */}
		</>
	);
}

function Heading({ title }: { title: string }) {
	return (
		<div className="flex">
			<h3 className="text-gray-700">{title}</h3>
		</div>
	);
}
