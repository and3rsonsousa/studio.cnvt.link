import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import styles from "./app.css";

export const links: LinksFunction = () => {
	return [
		{
			rel: "stylesheet",
			href: styles,
		},
	];
};

export const meta: MetaFunction = () => {
	return { title: "Remix + Cloudflare Pages + Tailwind CSS + Supabase" };
};

export default function App() {
	return (
		<html lang="pt-br">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
