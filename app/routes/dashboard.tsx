import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import SideBar from "~/components/SideBar";
import { getUserId } from "~/lib/session.server";
import { supabase } from "~/lib/supabase";
import type { LinkType } from "~/components/SideBar";
import type { AccountType, ProfileType } from "~/types";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
	let userId: string = await getUserId(request);
	if (!userId) return redirect("/login");

	let [{ data: profile }, { data: accounts, error }] = await Promise.all([
		supabase.from("profiles").select("*").eq("user_id", userId).single(),
		supabase
			.from("accounts")
			.select("*")
			.contains("user_id", [userId])
			.order("name"),
	]);

	if (error) throw new Error(error.message);

	return { profile, accounts };
};

export default function () {
	let { profile, accounts } = useLoaderData<{
		profile: ProfileType;
		accounts: AccountType[];
	}>();
	let links: LinkType[] = accounts.map((account) => ({
		name: account.name,
		url: `/dashboard/${account.slug}`,
	}));
	return (
		<div className="flex min-h-screen bg-gray-50">
			<SideBar links={links} profile={profile} />

			<article className="flex-1 overflow-x-hidden">
				<Outlet context={{ profile, accounts }} />
			</article>
		</div>
	);
}
