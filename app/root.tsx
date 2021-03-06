import type { ReactChild } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from "@remix-run/react";
import styles from "./app.css";

export const links: LinksFunction = () => {
	return [
		{
			rel: "stylesheet",
			href: styles,
		},
		{
			rel: "icon",
			href: "/favicon.png",
		},
	];
};

export const meta: MetaFunction = () => {
	return { title: "STUDIO > ᴄαɴɪᴠeᴛe" };
};

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

const Document = ({ children }: { children: ReactChild }) => {
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
				{children}

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
};

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<Document>
			<div className="p-8">
				<div className="error-block">
					<h1>Error</h1>
					<p className="text-gray-700">{error.message}</p>
					<pre className="max-w-lg whitespace-pre-line text-xs">
						{error.stack}
					</pre>
				</div>
			</div>
		</Document>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<Document>
			<div className="grid h-screen place-content-center">
				<div className="error-block max-w-sm">
					<h1>{caught.status}</h1>
					<p className="text-gray-700">{caught.statusText}</p>
					<pre className="whitespace-pre-wrap text-xs">
						{JSON.stringify(caught.data, null, 2)}
					</pre>
					<div className="mt-8 text-center">
						<button
							className="button"
							onClick={() => {
								history.back();
							}}
						>
							Voltar
						</button>
					</div>
				</div>
			</div>
		</Document>
	);
}
