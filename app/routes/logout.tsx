import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { logout } from "~/lib/session.server";

export const action: ActionFunction = async ({ request }) => {
	return await logout(request);
};

export const loader: LoaderFunction = async () => {
	return redirect("/");
};
