import { LoaderFunction, Outlet, redirect, useLoaderData } from "remix";
import SideBar, { LinkType } from "~/components/SideBar";
import { supabase } from "~/lib/supabase";
import { getSession } from "~/lib/session.server";
import { AccountType, ProfileType } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
	let session = await getSession(request.headers.get("Cookie"));

	if (!session.has("userId")) return redirect("/login");
	let userId = session.get("userId");

	let { data: accounts } = await supabase
		.from("accounts")
		.select()
		.contains("user_id", [userId])
		.order("name");

	let { data: profile } = await supabase
		.from("profiles")
		.select()
		.eq("user_id", userId)
		.single();

	return { accounts, profile };
};

export default function () {
	let { accounts, profile } =
		useLoaderData<{ accounts: AccountType[]; profile: ProfileType }>();
	let links: LinkType[] = accounts.map((account) => ({
		name: account.name,
		url: `/dashboard/account/${account.slug}`,
	}));
	return (
		<div className="flex min-h-screen bg-gray-100">
			<SideBar links={links} profile={profile} />

			<article className="flex-1 px-4 py-6 lg:p-8">
				<Outlet context={{ accounts, profile }} />
			</article>
		</div>
	);
}
