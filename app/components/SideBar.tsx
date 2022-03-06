import { Form, Link } from "remix";
import { AccountType, ProfileType } from "~/types";
import { HiOutlineUsers } from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";
import Avatar from "~/components/Avatar";

export type LinkType = { name: string; url: string };

type SideBarType = {
	links: LinkType[];
	profile: { name: string; role: number };
};

export default function SideBar({ links, profile }: SideBarType) {
	return (
		<aside className="sidebar relative z-20 bg-gray-900 py-8 lg:w-52 ">
			<div className="space-y-6 px-2 lg:px-4">
				<Link to="/dashboard" className="focus-50 block rounded-lg p-2 lg:p-4">
					<img src="/logo-small.svg" alt="STUDIO" className="mx-auto w-12 lg:hidden" />
					<img src="/logo.svg" alt="STUDIO" className="hidden w-24 lg:block" />
				</Link>
				<div>
					<h6 className="hidden px-4 font-bold text-gray-600 lg:block">Clientes</h6>
					<div>
						{links.map((link, index) => (
							<Link to={link.url} className="link" key={index}>
								<span className="block text-center font-bold uppercase lg:hidden">
									{link.name.substring(0, 3)}
								</span>
								<span className="hidden lg:block">{link.name}</span>
							</Link>
						))}
					</div>
				</div>
				<div className="flex flex-col items-center lg:block">
					<Link
						to="/dashboard/profile"
						className="focus-50 block rounded-full text-sm font-bold text-gray-200 lg:px-4"
					>
						<span className="lg:hidden">
							<Avatar avatar={{ name: profile.name }} size="m" />
						</span>
						<span className="hidden lg:block">{profile.name}</span>
					</Link>
					<Form method="post" action="/logout">
						<button
							type="submit"
							className="focus-50 mt-2 flex items-center space-x-2 rounded-lg p-2 text-xs font-bold uppercase tracking-wide transition hover:text-gray-300 lg:mt-0 lg:px-4"
						>
							SAIR
						</button>
					</Form>
				</div>
			</div>
			{profile.role === 1 ? (
				<div className="mt-8 space-y-6 border-t border-gray-800 px-2 pt-4 lg:px-4">
					<h6 className="hidden px-4 pt-4 font-bold text-gray-600 lg:block">ADM</h6>
					<div>
						<Link to="/dashboard/profiles/" className="link">
							<span className="hidden lg:block">Usuários</span>
							<span>
								<HiOutlineUsers className="mx-auto text-xl lg:hidden" />
							</span>
						</Link>
						<Link to="/dashboard/accounts/" className="link">
							<span className="hidden lg:block">Clientes</span>
							<MdWorkOutline className="mx-auto text-xl lg:hidden" />
						</Link>
					</div>
				</div>
			) : null}
		</aside>
	);
}
