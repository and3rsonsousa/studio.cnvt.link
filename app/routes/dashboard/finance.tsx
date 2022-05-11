import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import {
	Form,
	useLoaderData,
	useSubmit,
	useTransition,
} from "@remix-run/react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // import locale
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useRef, useState } from "react";
import { ViewHeader } from "~/components/Display/Calendar/MonthView";
import { Input } from "~/components/Forms";
import { supabase } from "~/lib/supabase";

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
	const formData = await request.formData();

	let { action, ...values } = Object.fromEntries(formData);

	if (action === "create") {
		let { data: created, error } = await supabase
			.from("finance")
			.insert({ ...values });
		if (error) {
			throw new Error(error.message);
		}
		return created;
	} else if (action === "update") {
		let { id } = values;
		let { data: updated, error } = await supabase
			.from("finance")
			.update({ ...values })
			.eq("id", id);
		if (error) {
			throw new Error(error.message);
		}
		return updated;
	} else if (action === "delete") {
		console.log({ values });
		let { id } = values;
		let { data: deleted, error } = await supabase
			.from("finance")
			.delete()
			.eq("id", id);
		if (error) {
			throw new Error(error.message);
		}
		return deleted;
	}
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

	let [view, setView] = useState(1);
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
										defaultChecked={item.value === type}
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
				{view === 1 ? (
					<List data={currentData} current={current} />
				) : null}
				{view === 2 ? (
					<Calendar data={currentData} current={current} />
				) : null}
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
	isForm?: true;
};

const Item = ({
	item: { name, date, amount, io, id, isForm },
}: {
	item: ItemProps;
}) => {
	let formatter = Intl.NumberFormat("pt-BR", {
		currency: "BRL",
	});

	let datejs = dayjs(date);
	let form = useRef<HTMLFormElement>(null);
	let submit = useSubmit();

	return (
		<div className="group flex items-center gap-2 border-b py-2 transition-colors focus-within:border-brand-600">
			<div className="flex w-4 items-center">
				<div
					className={`h-2 w-2 rounded-full ${
						Number(io) > 0 ? "bg-success-500" : "bg-error-500"
					}`}
				></div>
			</div>

			<Form
				method="post"
				ref={form}
				className="w-full"
				id={`form_item_${id}`}
			>
				<input type="hidden" value={id} name="id" />
				<input type="hidden" value="update" name="action" />
				<input
					type="text"
					defaultValue={name}
					className="w-full bg-transparent transition-colors focus:text-gray-900 focus:outline-none"
					onBlur={(event) => {
						if (name !== event.currentTarget.value.trim())
							submit(event.currentTarget.form);
					}}
					name="name"
				/>
			</Form>

			<div className=" opacity-0 transition group-hover:opacity-100">
				<button
					className="text-xx button button-small button-ghost p-0  font-medium uppercase tracking-wider text-error-700 hover:text-error-500"
					name="action"
					value="delete"
					form={`form_item_${id}`}
				>
					Deletar
				</button>
			</div>
			<div className="w-20 text-xs">
				<span className="mr-1 font-bold">{datejs.format(`DD`)}</span>
				<span className="uppercase text-gray-400">
					{datejs.format(`MMM`)}
				</span>
			</div>
			<div className="flex w-32 items-start justify-end gap-1">
				<span className="mt-1 text-xs">R$</span>
				{/* <span className="font-bold">
					{formatter.format(Number(amount))}
				</span> */}
				<Form
					method="post"
					ref={form}
					className="w-full"
					id={`form_item_amount_${id}`}
				>
					<input type="hidden" value={id} name="id" />
					<input type="hidden" value="update" name="action" />
					<input
						type="number"
						defaultValue={Number(amount)}
						className="w-full bg-transparent font-bold transition-colors focus:text-gray-900 focus:outline-none"
						onBlur={(event) => {
							if (amount !== event.currentTarget.value.trim())
								submit(event.currentTarget.form);
						}}
						name="amount"
					/>
				</Form>
			</div>
		</div>
	);
};

function sum(values: Array<number> | undefined): number {
	if (!values) return 0;

	return values.length > 0 ? values.reduce((prev, curr) => prev + curr) : 0;
}

function List({ data, current }: { data: ItemProps[]; current: Dayjs }) {
	let values = data.map((d) => Number(d.amount) * Number(d.io));

	return (
		<div>
			<div>
				{data.map((item: ItemProps) => (
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

type DayProps = { date: number; finances?: undefined | Array<ItemProps> };

function Calendar({ data, current }: { data: ItemProps[]; current: Dayjs }) {
	let days = Array<DayProps>(current.endOf("month").date());

	for (let i = 0; i < days.length; i++) {
		let finances = data.filter((item) => dayjs(item.date).date() === i + 1);
		days[i] = {
			date: i + 1,
			finances: finances.length ? finances : undefined,
		};
	}

	return (
		<div className="flex snap-x overflow-x-scroll">
			{days.map((day) =>
				day.finances ? <CalendarItem day={day} /> : null
			)}
		</div>
	);
}

function CalendarItem({ day }: { day: DayProps }) {
	let values = day.finances?.map((d) => Number(d.amount) * Number(d.io));
	let formatter = Intl.NumberFormat("pt-BR", {
		currency: "BRL",
	});
	return (
		<div
			key={day.date}
			className="flex w-80 shrink-0 snap-start flex-col justify-between p-4"
		>
			<div>
				<h5>{day.date}</h5>
				<div>
					{day.finances?.map((finance) => (
						<div
							className="flex justify-between border-t py-2"
							key={finance.id}
						>
							<div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
								{finance.name}
							</div>
							<div className="flex w-32 items-start justify-end gap-1">
								<span className="mt-1 text-xs">R$</span>
								<span className="font-bold">
									{formatter.format(Number(finance.amount))}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-between border-t border-gray-700 py-2">
				<div className="font-bold">Total do dia</div>
				<div className="flex w-32 items-start justify-end gap-1">
					<span className="mt-1 text-xs">R$</span>
					<span className="font-bold">
						{formatter.format(sum(values))}
					</span>
				</div>
			</div>
		</div>
	);
}
