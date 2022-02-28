import { createClient } from "@supabase/supabase-js";
import { LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async () => {
	let db = createClient(
		"https://prmvfibheijucdazdfzc.supabase.co",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY4MzI1MCwiZXhwIjoxOTU5MjU5MjUwfQ.ElgtQJthx_B3DM_zIL2acASAo_J_F9HclpLDv1m_hQ0"
	);
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
