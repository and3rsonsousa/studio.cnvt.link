import { HiPlusCircle } from "react-icons/hi";
import { Link } from "remix";

export default function () {
	return (
		<div className="mx-auto max-w-lg xl:mx-0 xl:w-96">
			<Link
				to="./new"
				className="button button-primary button-sm items-center space-x-2"
			>
				<span>Novo Cliente</span>
				<HiPlusCircle className="text-2xl" />
			</Link>
		</div>
	);
}
