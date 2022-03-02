import { LoaderFunction, Outlet, useLoaderData } from "remix";
import ListItem from "~/components/ListItem";
import { supabase } from "~/lib/supabase";
import { ProfileType } from "~/types";

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
		<div className="g-gray-100 flex min-h-screen w-full flex-col justify-start gap-16 p-4 lg:flex-row">
			<Outlet />
			<div className="lg:order-1">
				<div className="mx-auto max-w-lg lg:mx-0 xl:w-96">
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
		</div>
	);
}
