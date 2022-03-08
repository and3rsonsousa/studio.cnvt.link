import { LoaderFunction, Outlet, redirect, useLoaderData } from "remix";
import SideBar, { LinkType } from "~/components/SideBar";
import { supabase } from "~/lib/supabase";
import { getSession, getUserId } from "~/lib/session.server";
import { AccountType, ProfileType } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
	let userId: string = await getUserId(request);
	if (!userId) return redirect("/login");

	let data = await Promise.all([
		supabase.from("profiles").select("*").eq("user_id", userId).single(),
		supabase.from("accounts").select("*").contains("user_id", [userId]).order("name"),
	]);

	let { data: profile } = data[0];
	let { data: accounts, error } = data[1];

	if (error) throw new Error(error.message);

	return { profile, accounts };
};

export default function () {
	let { profile, accounts } = useLoaderData<{ profile: ProfileType; accounts: AccountType[] }>();
	let links: LinkType[] = accounts.map((account) => ({
		name: account.name,
		url: `/dashboard/${account.slug}`,
	}));
	return (
		<div className="flex min-h-screen bg-gray-100">
			<SideBar links={links} profile={profile} />

			<article className="flex-1 overflow-x-hidden">
				<Outlet context={{ profile, accounts }} />
			</article>
		</div>
	);
}
