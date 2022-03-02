import { LoaderFunction, Outlet, useLoaderData } from "remix";
import ListItem from "~/components/ListItem";
import { supabase } from "~/lib/supabase";
import { ProfileType } from "~/types";

export const loader: LoaderFunction = async () => {
	let data = await supabase.from("profiles").select();
	return data;
};

export default function () {
	let { data } = useLoaderData();

	return (
		<div className="g-gray-100 flex min-h-screen w-full flex-col justify-start gap-16 xl:flex-row">
			<div className="mx-auto max-w-lg xl:mx-0 xl:w-96">
				<h3 className="text-gray-900">Usuários</h3>
				{data.length ? (
					<div>
						{data.map((profile: ProfileType) => (
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
						Nenhum usuário no sistema
					</div>
				)}
			</div>

			<Outlet />
		</div>
	);
}
