import { createClient as createSupabase } from "@supabase/supabase-js";
import { LoaderFunction, useLoaderData } from "remix";
import { createClient } from "urql";

export const loader: LoaderFunction = async () => {
	let db = createSupabase(
		"https://hoyinguwpfswbquxpnxo.supabase.co",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveWluZ3V3cGZzd2JxdXhwbnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg2MDI0NzAsImV4cCI6MTk2NDE3ODQ3MH0.26Mo3lzTZxEGGj-58NExlSy2IOgQW72ROFKe7Z7TH1A"
	);

	const client = createClient({
		url: "https://hoyinguwpfswbquxpnxo.supabase.co/graphql/v1",
	});

	let { data } = await db.from("actions").select("*, categories(*)");

	return { data };
};

export default function New() {
	let data = useLoaderData();
	return (
		<div>
			<pre>{JSON.stringify(data, undefined, 2)}</pre>
		</div>
	);
}
