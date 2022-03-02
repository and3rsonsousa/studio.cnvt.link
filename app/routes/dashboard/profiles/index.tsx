import { HiPlusCircle } from "react-icons/hi";
import { Link } from "remix";

export default function () {
	return (
		<div className="order-3 mx-auto max-w-lg lg:mx-0 lg:w-96">
			<Link
				to="./new"
				className="button button-primary button-sm items-center space-x-2"
			>
				<span>Novo Usuário</span>
				<HiPlusCircle className="text-2xl" />
			</Link>
		</div>
	);
}
