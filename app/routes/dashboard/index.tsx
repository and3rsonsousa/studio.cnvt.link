import { LoaderFunction, useLoaderData, useOutletContext } from "remix";
import { getUserId } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";

export const loader: LoaderFunction = async ({ request, context }) => {
	let userId = await getUserId(request);
	let data = await supabase
		.from("accounts")
		.select("*, actions(*)")
		.contains("user_id", [userId]);

	return { data };
};
export default function () {
	let data = useLoaderData();
	let context = useOutletContext();
	return (
		<div className="page">
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
