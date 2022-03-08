import { motion } from "framer-motion";
import { useEffect } from "react";
import { HiOutlinePencil, HiOutlineX } from "react-icons/hi";
import { Link, useActionData, useFetcher, useTransition } from "remix";
import { fade } from "~/lib/animations";
import { ActionType } from "~/types";
import { Heading } from "../Display";

type ListProps = {
	actions: ActionType[];
};

export default function List({ actions }: ListProps) {
	let transition = useTransition();
	return (
		<div>
			<Heading title="Lista" />
			<div className="rounded-xl border bg-white shadow shadow-gray-500/20">
				<div className="grid grid-cols-3 items-center p-2 py-4 text-xs font-bold uppercase tracking-wide lg:px-4">
					<div className="col-span-2">Nome</div>
					<div className="text-right">Ações</div>
				</div>

				{transition.submission?.formData.get("action") === "new-action" && (
					<div
						className={`group grid grid-cols-3 items-center border-t p-2 opacity-25 hover:bg-gray-50 lg:px-4`}
					>
						<div className="col-span-2 font-semibold text-gray-700">
							{transition.submission?.formData.get("name")}
						</div>
					</div>
				)}
				{actions.length > 0 ? (
					actions.map((action) => <ListItem action={action} key={action.id} />)
				) : (
					<div className="p-2 lg:px-4">Nenhuma ação cadastrada.</div>
				)}
			</div>
		</div>
	);
}

export function ListItem({ action, loading = false }: { action: ActionType; loading?: boolean }) {
	let fetcher = useFetcher();
	let isDeleting = (fetcher.submission?.formData.get("id") as string) === String(action.id);
	let isFailed = fetcher.data?.error;

	return (
		<div
			className={`group grid grid-cols-3 items-center border-t p-2 hover:bg-gray-50 lg:px-4 ${
				isDeleting && "hidden"
			} ${isFailed && "border-error-200 bg-error-100"}`}
		>
			<div className="col-span-2 font-semibold text-gray-700">{action.name}</div>
			{!loading && (
				<div className="flex items-center justify-end  transition  group-hover:opacity-100">
					<Link
						to={`/dashboard/action/${action.id}`}
						className="button button-small button-icon button-ghost"
					>
						<HiOutlinePencil />
					</Link>
					<fetcher.Form method="post">
						<input type="hidden" name="id" value={action.id} />
						<button
							className="button button-small button-icon button-ghost"
							type="submit"
							name="action"
							value="delete"
						>
							<HiOutlineX />
						</button>
					</fetcher.Form>
				</div>
			)}
		</div>
	);
}
