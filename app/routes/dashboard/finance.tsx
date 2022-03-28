import { useEffect, useRef, useState } from "react";
import {
	ActionFunction,
	Form,
	LoaderFunction,
	useLoaderData,
	useTransition,
} from "remix";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br"; // import locale

import { Input } from "~/components/Forms";
import { supabase } from "~/lib/supabase";
import { ViewHeader } from "~/components/Display/Calendar/MonthView";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

dayjs.tz.setDefault("America/Sao_Paulo");

export const loader: LoaderFunction = async ({ request }) => {
	let { data, error } = await supabase
		.from("finance")
		.select("*")
		.order("date")
		.order("created_at");

	if (error) throw new Error(error.message);

	return { data };
};

export const action: ActionFunction = async ({ request }) => {
	let { action, ...values } = Object.fromEntries(await request.formData());

	if (action === "create") {
		let { data: created, error } = await supabase
			.from("finance")
			.insert({ ...values });

		if (error) {
			throw new Error(error.message);
		}
	}

	return "";
};

export default function Finance() {
	let { data }: { data: Array<ItemProps> } = useLoaderData();
	let [type, setType] = useState(1);
	let io = [
		{
			id: 1,
			name: "Entrada",
			value: 1,
		},
		{
			id: 2,
			name: "Saída",
			value: -1,
		},
	];
	let [current, setCurrent] = useState(dayjs());
	let currentData = data.filter(
		(item) => dayjs(item.date).month() === current.month()
	);

	let form = useRef<HTMLFormElement>(null);

	let transition = useTransition();
	let isAdding = transition.submission?.formData
		? transition.submission.formData.get("amount")
			? true
			: false
		: false;

	useEffect(() => {
		form.current?.reset();
		setType(1);
	}, [isAdding]);

	let values = currentData.map((d) => Number(d.amount) * Number(d.io));
	return (
		<div className="px-4 py-6 lg:p-8">
			<h2 className="text-gray-700">Financeiro</h2>
			{/* <div>
				<div className="sm:hidden">none</div>
				<div className="hidden sm:block md:hidden">sm</div>
				<div className="hidden md:block lg:hidden">md</div>
				<div className="hidden lg:block xl:hidden">lg</div>
				<div className="hidden xl:block 2xl:hidden">xl</div>
				<div className="hidden 2xl:block 3xl:hidden">2xl</div>
			</div> */}
			<div>
				<Form
					ref={form}
					method="post"
					className="grid grid-cols-3 items-end gap-4 lg:grid-cols-8"
				>
					{/* Título */}
					<div className="col-span-3 md:col-span-2">
						<Input label="Título" name="name" />
					</div>
					{/* Data */}
					<div className="col-span-2 md:col-span-1 lg:col-span-2">
						<Input
							label="Data"
							name="date"
							type="date"
							value={dayjs().format("YYYY-MM-DD")}
							before={(value) => (
								<div className="w-16 pl-4 text-sm font-semibold uppercase text-gray-700">
									{dayjs(value).format("ddd")}
								</div>
							)}
						/>
					</div>
					{/* Valor */}
					<div className="col-span-1 lg:col-span-2">
						<Input
							label="Valor"
							name="amount"
							type="number"
							value={"0.00"}
							before={() => {
								return (
									<div className="-mr-3 pl-4 text-sm font-semibold uppercase text-gray-700">
										R$
									</div>
								);
							}}
						/>
					</div>
					{/* io */}
					<div className="flex h-12 items-center justify-center">
						<div className="button-group button-group-small">
							{io.map((item) => (
								<label
									className={`button button-small tracking-wide ${
										type === item.value
											? type === 1
												? "bg-success-500 text-success-100 hover:bg-success-600 hover:text-white"
												: "bg-error-500 text-error-100 hover:bg-error-600 hover:text-white"
											: "bg-white"
									}`}
									onClick={() => setType(item.value)}
									key={item.id}
								>
									<input
										type="radio"
										value={item.value}
										name="io"
										checked={item.value === type}
										className="hidden"
									/>
									<span>
										<span>{item.name.slice(0, 1)}</span>
									</span>
								</label>
							))}
						</div>
					</div>

					<div className="col-span-2 mt-8 text-right md:col-span-1">
						<button
							name="action"
							value="create"
							type="submit"
							className="button button-primary"
						>
							Inserir
						</button>
					</div>
				</Form>
			</div>

			<div className="mt-8 border-t pt-8">
				<ViewHeader
					title={`${current.format("MMMM")}
					${current.year() !== dayjs().year() ? current.format(" [de] YYYY") : ""}`}
					prev={() => setCurrent(current.subtract(1, "month"))}
					next={() => setCurrent(current.add(1, "month"))}
				/>
				{currentData.map((item: ItemProps) => (
					<Item item={item} key={item.id} />
				))}
			</div>
			<div className="border-t border-gray-700">
				<Item
					item={{
						amount: sum(values).toString(),
						date:
							dayjs().month() === current.month()
								? dayjs().format("YYYY-MM-DD")
								: current.endOf("M").format("YYYY-MM-DD"),
						id: "0",
						io: "1",
						name: "Total",
					}}
				/>
			</div>
		</div>
	);
}

type ItemProps = {
	id: string;
	io: string;
	name: string;
	date: string;
	amount: string;
};

const Item = ({
	item: { name, date, amount, io, id },
}: {
	item: ItemProps;
}) => {
	let formatter = Intl.NumberFormat("pt-BR", {
		currency: "BRL",
	});

	let datejs = dayjs(date);

	return (
		<Form method="post" className="flex items-center gap-2 border-b py-2">
			<input type="hidden" value={id} />

			<div className="flex w-4 items-center">
				<div
					className={`h-2 w-2 rounded-full ${
						Number(io) > 0 ? "bg-success-500" : "bg-error-500"
					}`}
				></div>
			</div>
			<div className="w-full">
				<div className="overflow-hidden text-ellipsis whitespace-nowrap">
					{name}
				</div>
			</div>
			<div className="w-20 text-xs">
				<span className="mr-1 font-bold">{datejs.format(`DD`)}</span>
				<span className="uppercase text-gray-400">
					{datejs.format(`MMM`)}
				</span>
			</div>
			<div className="flex w-32 items-start justify-end gap-1">
				<span className="mt-1 text-xs">R$</span>
				<span className="font-bold">
					{formatter.format(Number(amount))}
				</span>
			</div>
		</Form>
	);
};

function sum(values: Array<number>) {
	return values.length > 0 ? values.reduce((prev, curr) => prev + curr) : 0;
}
