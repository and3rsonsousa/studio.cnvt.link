import { ActionType } from "~/types";

type GridProps = {
	actions: ActionType[];
};

export default function Grid({ actions }: GridProps) {
	return (
		<div>
			<h1>Instagram Grid</h1>
		</div>
	);
}
