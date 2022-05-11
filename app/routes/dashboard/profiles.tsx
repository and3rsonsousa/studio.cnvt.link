import type { LoaderFunction } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import ListItem from "~/components/ListItem";
import { supabase } from "~/lib/supabase";
import type { ProfileType } from "~/types";

export const loader: LoaderFunction = async () => {
	let { data: profiles, error } = await supabase
		.from("profiles")
		.select("*")
		.order("name");

	if (error) throw new Error(error.message);

	return { profiles };
};

export default function () {
	let { profiles } = useLoaderData();

	return (
		<div className="p-8 lg:flex lg:gap-16 ">
			<div className="mx-auto mb-16 w-full max-w-sm lg:order-2 lg:m-0">
				<Outlet />
			</div>

			<div className="mx-auto w-full max-w-sm lg:order-1 lg:m-0">
				<h3 className="text-gray-900">Usuários</h3>
				{profiles.length ? (
					<div>
						{profiles.map((profile: ProfileType) => (
							<ListItem
								item={{
									...profile,
									description: profile.email,
								}}
								edit
								model="profiles"
								key={profile.id}
							/>
						))}
					</div>
				) : (
					<div className="text-sm text-gray-400">
						Nenhum usuário cadastrado no sistema
					</div>
				)}
			</div>
		</div>
	);
}
