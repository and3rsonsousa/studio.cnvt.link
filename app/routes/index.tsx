import { Link } from "remix";

export default function Index() {
	return (
		<div className="">
			<div className="flex h-screen items-center justify-center bg-gray-100">
				<div>
					<div>
						<img src="/logo.svg" alt="STUDIO" className="w-52" />
					</div>
					<div className="mt-8 text-center">
						<Link to="/login" className="button button-white">
							Entrar
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
