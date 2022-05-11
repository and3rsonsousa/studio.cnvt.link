import type { LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";
import type { ProfileType } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
	let session = await getSession(request.headers.get("Cookie"));
	let userId = session.get("userId");

	let { data: profile } = await supabase
		.from("profiles")
		.select()
		.eq("user_id", userId)
		.single();
	return { profile };
};

export default function () {
	let { profile }: { profile: ProfileType } = useLoaderData();
	return (
		<div>
			<h2 className="text-gray-700">{profile.name}</h2>
			<p> {profile.email} </p>
			<p> {profile.image} </p>
		</div>
	);
}
