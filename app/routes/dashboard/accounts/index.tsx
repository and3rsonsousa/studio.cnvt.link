import { HiPlusCircle } from "react-icons/hi";
import { Link } from "@remix-run/react";

export default function () {
	return (
		<div className="text-right">
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
