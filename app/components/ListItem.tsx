import { BsFillPencilFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { Form, Link } from "remix";

interface Props {
	id: number;
	name: string;
	description?: string;
	slug?: string;
}

export default function ListItem({
	item,
	edit,
	del,
	model,
}: {
	item: Props;
	edit?: boolean;
	del?: boolean;
	model: string;
}) {
	return (
		<div
			className="flex items-center justify-between gap-2 border-b py-4"
			key={item.id}
		>
			<div>
				<div className="text-gray-700">{item.name}</div>
				{(item.description || item.slug) && (
					<div className="text-xs tracking-wide text-gray-400">
						{item.description || item.slug}
					</div>
				)}
			</div>
			{(edit || del) && (
				<Form
					method="post"
					className="flex items-center space-x-4"
					name="listitem"
				>
					<input type="hidden" value={item.id} name="id" />
					{edit && (
						<Link
							className="  text-gray-300 transition hover:text-gray-500"
							to={`/dashboard/${model}/edit/${item.id}`}
						>
							<BsFillPencilFill />
						</Link>
					)}
					{del && (
						<button
							type="submit"
							className=" text-gray-300 transition hover:text-gray-500"
							name="_action"
							value="delete"
						>
							<IoClose className="text-2xl" />
						</button>
					)}
				</Form>
			)}
		</div>
	);
}
