import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { Link } from "remix";

export default function Index() {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="grid h-[70vh] place-content-center  bg-gradient-to-br from-brave via-brand-600 to-pacific">
				<div className="space-y-16 px-8 py-24 text-center">
					<div>
						<img src="/logo-white.svg" alt="STUDIO" className="mx-auto w-52" />
					</div>
					<div className="max-w-sm text-xl text-white">
						STUDIO é o sistema de gestão de tarefas criado/usado pela Agência Canivete.
					</div>
					<HiOutlineChevronDoubleDown className="mx-auto text-3xl text-pacific" />
				</div>
			</div>
			<div className="py-16 text-center">
				<Link to="/login" className="button button-primary">
					Entrar
				</Link>
			</div>
		</div>
	);
}
