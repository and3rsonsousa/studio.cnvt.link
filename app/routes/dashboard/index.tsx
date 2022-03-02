import { LoaderFunction, useLoaderData, useOutletContext } from "remix";

export const loader: LoaderFunction = async () => {
	return { data: "data" };
};
export default function () {
	let data = useLoaderData();
	let context = useOutletContext();
	return (
		<div className="page">
			<h1>Lorem, ipsum dolor.</h1>
			<pre>{JSON.stringify(context, null, 2)}</pre>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Aliquid, dolore. Quisquam fuga nam nulla libero veniam
				doloribus. Impedit laboriosam quibusdam quas ea cum quo sit
				voluptas. Iusto repellendus ab quae.
			</p>
		</div>
	);
}
