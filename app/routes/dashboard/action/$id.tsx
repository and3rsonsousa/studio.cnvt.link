import { LoaderFunction, useLoaderData } from "remix";
import { getUserId } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";

export const loader: LoaderFunction = async ({ request, params }) => {
	let userId = await getUserId(request);
	let { id } = params;

	let data = await Promise.all([
		supabase
			.from("actions")
			.select("*, accounts(*), flows(*), steps(*), tags(*), campaigns(*)")
			.eq("id", id)
			.eq("user_id", userId)
			.single(),
		supabase.from("profiles").select("*").eq("user_id", userId).single(),
	]);

	let { data: action, error: error1 } = data[0];
	let { data: profile, error: error2 } = data[1];

	if (error1) throw new Error(error1.message);
	if (error2) throw new Error(error2.message);

	return { action, profile };
};

export default function Action() {
	let { action, profile } = useLoaderData();
	return (
		<div>
			<pre>{JSON.stringify({ action, profile }, null, 2)}</pre>
		</div>
	);
}
