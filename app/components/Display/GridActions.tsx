import { ReactChild, ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
	return <div className="mb-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-6">{children}</div>;
}
