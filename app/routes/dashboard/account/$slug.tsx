import { LoaderFunction, useLoaderData, useLocation } from "remix";
import { supabase } from "~/lib/supabase";

export const loader: LoaderFunction = async ({ params }) => {
	let { data: account } = await supabase
		.from("accounts")
		.select("*, actions(*)")
		.eq("slug", params.slug);
	return { account };
};

export default function () {
	let { account } = useLoaderData();
	return (
		<div>
			<pre>{JSON.stringify(account, null, 2)}</pre>
		</div>
	);
}
