import { LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
	return { params };
};

export default function () {
	let data = useLoaderData();
	return (
		<div>
			Tô aqui
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
