import { Outlet } from "remix";

export default function Action() {
	return (
		<div>
			<h1>Action</h1>
			<Outlet />
		</div>
	);
}
