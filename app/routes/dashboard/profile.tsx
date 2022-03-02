import { LoaderFunction, useLoaderData } from "remix";
import db from "~/lib/db";
import { getSession } from "~/lib/session.server";
import { IProfile } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
	let session = await getSession(request.headers.get("Cookie"));
	let userId = session.get("userId");

	let { data: profile } = await db
		.from("profiles")
		.select()
		.eq("user_id", userId)
		.single();
	return { profile };
};

export default function () {
	let { profile }: { profile: IProfile } = useLoaderData();
	return (
		<div>
			<h2 className="text-gray-700">{profile.name}</h2>
			<p> {profile.email} </p>
			<p> {profile.image} </p>
		</div>
	);
}
