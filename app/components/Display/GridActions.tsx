import { ReactChild, ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
	return (
		<div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6">{children}</div>
	);
}
