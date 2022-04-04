import { ActionFunction, Outlet } from "remix";
import { handleAction } from "~/lib/db.server";

export const action: ActionFunction = async ({ request }) => {
	return await handleAction(request);
};

export default function Slug() {
	return <Outlet />;
}
