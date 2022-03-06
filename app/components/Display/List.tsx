import { ActionType } from "~/types";

type ListProps = {
	actions: ActionType[];
};

export default function List({ actions }: ListProps) {
	return (
		<div>
			<h1>Lista</h1>
		</div>
	);
}
