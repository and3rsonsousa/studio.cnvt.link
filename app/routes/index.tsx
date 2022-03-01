import { createClient } from "@supabase/supabase-js";
import { LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({ context }) => {
	let db = createClient(context.SUPABASE_URL, context.SUPABASE_KEY, {
		fetch: fetch.bind(self),
	});
	let data = await db.from("actions").select("*");

	return { data };
};

export default function Index() {
	let data = useLoaderData();
	return (
		<div className="bg-gray-100 p-16">
			<pre className="mb-8 rounded-md bg-gray-800 p-8 text-blue-500">
				{JSON.stringify(data, null, 2)}
			</pre>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores,
			asperiores! Voluptate fugit, dolor laudantium quos minus eligendi
			assumenda amet velit dignissimos necessitatibus aut, voluptatum illo
			ipsa commodi excepturi ullam labore?
		</div>
	);
}
