import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // import locale
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import {
	HiOutlineCalendar,
	HiOutlineChevronRight,
	HiOutlinePencil,
	HiOutlineX,
} from "react-icons/hi";
import { Form, Link, useSubmit, useTransition } from "remix";
import { flows, steps, tags } from "~/lib/data";
import { isLate, writeDate } from "~/lib/functions";
import { ActionType } from "~/types";
import Avatar from "./Avatar";
import { ListBox } from "./Forms";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export type ActionProps = {
	action: ActionType;
};

// TODO Incluir Responsável caso seja outra pessoa
// TODO: Ação de deletar
// TODO: Ação de selecionar vários

// TODO: update Start Date
// TODO: update End Date

export default function Action({ action }: ActionProps) {
	let [timeInfo, setTimeInfo] = useState(true);
	let submit = useSubmit();
	let transition = useTransition();
	let isMutating =
		transition.submission?.formData.get("id") === String(action.id);

	if (transition.submission?.formData.get("id") === String(action.id)) {
		console.log(Object.fromEntries(transition.submission?.formData));
	}
	return (
		<div
			className={`group flex min-w-fit justify-between gap-2 rounded-xl border border-transparent bg-white px-4 py-3 text-sm shadow shadow-gray-500/20 ring-1 ring-black/[.02] transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-600/20 focus-within:duration-500 ${
				isMutating ? "scale-95 opacity-50 duration-300" : ""
			}`}
		>
			{/* Cliente e Campanha */}

			<div className="w-full">
				<div className={`flex items-center gap-1`}>
					<Link
						to={`/dashboard/${action.account.slug}`}
						className="text-xxx font-medium uppercase leading-none tracking-wide text-gray-400 transition hover:text-gray-700"
					>
						{!action.campaign_id ? (
							<span className="overflow-hidden text-ellipsis whitespace-nowrap">
								{action.account.name}
							</span>
						) : (
							action.account.name.slice(0, 3)
						)}
					</Link>
					{action.campaign && (
						<>
							<HiOutlineChevronRight className="text-xx" />
							<Link
								className="text-xxx overflow-hidden text-ellipsis whitespace-nowrap font-medium uppercase leading-none tracking-wide text-gray-400 transition hover:text-gray-700"
								to={`dashboard/${action.account.slug}/campaign/${action.campaign.slug}`}
							>
								{action.campaign.name}
							</Link>
						</>
					)}
				</div>

				{/* Name of the Action */}
				<div className="flex gap-1">
					<Form
						className="w-full"
						method="post"
						name="action_form"
						id={`action_form_${action.id}`}
					>
						{/* <input type="hidden" name="action" value="update" /> */}
						<input type="hidden" name="id" value={action.id} />
						<input
							type="hidden"
							name="flow_id"
							value={action.flow_id}
						/>
						<input
							type="hidden"
							name="step_id"
							value={action.step_id}
						/>
						<input
							type="hidden"
							name="tag_id"
							value={action.tag_id}
						/>
						<input type="hidden" name="action" value="update" />

						<input
							type="text"
							name="name"
							className={`w-full text-lg font-semibold tracking-tight text-gray-900 transition focus:outline-none`}
							defaultValue={action.name}
							autoComplete="off"
							onBlur={(event) => {
								if (
									action.name !==
									event.currentTarget.value.trim()
								)
									submit(event.currentTarget.form);
							}}
						/>
					</Form>
				</div>
				{/* 
        Datas
          - Quando Começa
          - Quando termina 

        Prazos
          - Em quanto tempo Deve Começar/quanto tempo de atraso
          - Em quanto tempo deve terminar/Quanto tepo de Atraso 
        */}

				<div className="flex  items-center gap-2">
					<div
						className="flex cursor-pointer flex-wrap gap-1 text-xs"
						onClick={() => setTimeInfo(!timeInfo)}
					>
						{timeInfo ? (
							action.start ? (
								<div
									className={`${
										isLate(action.start, action.step_id)
											? "text-error-500 transition hover:text-error-700"
											: ""
									}`}
								>
									{dayjs(action.start).fromNow() +
										(isLate(action.start, action.step_id)
											? " em atraso"
											: "")}
								</div>
							) : (
								<div
									className={`${
										isLate(action.end, action.step_id)
											? "text-error-500 transition hover:text-error-700"
											: ""
									}`}
								>
									{dayjs(action.end).fromNow() +
										(isLate(action.end, action.step_id)
											? " em atraso"
											: "")}
								</div>
							)
						) : (
							<>
								{action.start ? (
									<>
										<div className="order-1  whitespace-nowrap">
											{dayjs(action.start).format("D") +
												(dayjs(action.start).format(
													"MMMM YYYY"
												) !==
												dayjs(action.end).format(
													"MMMM YYYY"
												)
													? dayjs(
															action.start
													  ).format(" [de] MMMM")
													: "") +
												(dayjs(action.start).year() !==
												dayjs(action.end).year()
													? dayjs(
															action.start
													  ).format("[ de] YYYY")
													: "") +
												" a"}
										</div>

										<div className="order-3  whitespace-nowrap text-gray-400 transition hover:text-gray-700">
											(
											{dayjs(action.start).to(
												action.end,
												true
											)}
											)
										</div>
									</>
								) : null}
								<div className="order-2  whitespace-nowrap">
									{dayjs(action.end).format("D [de] MMMM") +
										(dayjs(action.end).year() !==
											dayjs().year() ||
										(action.start &&
											dayjs(action.start).year() !==
												dayjs(action.end).year())
											? dayjs(action.end).format(
													"[ de] YYYY [às] H[:]mm"
											  )
											: dayjs(action.end).format(
													" [às] H[:]mm"
											  ))}
								</div>
							</>
						)}
					</div>
					<button className="button button-ghost p-1 text-gray-300 opacity-0 group-hover:opacity-100">
						<HiOutlineCalendar />
					</button>
				</div>

				{/* 
        Flow - Step - Tag 
        */}
				<div className="flex items-end justify-between gap-2">
					<div className="listbox-group flex">
						<ListBox
							item_id={action.id}
							values={flows}
							selected={
								flows.filter(
									(flow) => flow.id === action.flow_id
								)[0]
							}
							name="flow_id"
							table="actions"
						/>
						<ListBox
							item_id={action.id}
							values={steps}
							selected={
								steps.filter(
									(step) => step.id === action.step_id
								)[0]
							}
							name="step_id"
							table="actions"
						/>
						<ListBox
							item_id={action.id}
							values={tags}
							selected={
								tags.filter(
									(tag) => tag.id === action.tag_id
								)[0]
							}
							name="tag_id"
							table="actions"
						/>
					</div>
				</div>
			</div>
			<div className="grid place-content-center gap-2 opacity-0 transition group-hover:opacity-100">
				<Avatar avatar={{ name: action.profile.name }} size="s" />
				<Link
					to={`/dashboard/${action.account?.slug}/${action.id}`}
					className="button button-ghost flex p-0 text-xl text-gray-300 "
				>
					<HiOutlinePencil />
				</Link>
				<button
					type="submit"
					form={`action_form_${action.id}`}
					name="action"
					value="delete"
					className="button button-ghost p-0 text-xl text-gray-300"
				>
					<HiOutlineX />
				</button>
			</div>
		</div>
	);
}

export function ActionLink({
	action,
	small,
	color,
}: {
	action: ActionType;
	small?: boolean;
	color?: string;
}) {
	let bg = "";

	switch (color) {
		case "Flow":
			bg = `bg-${flows[action.flow_id - 1].slug}`;
			break;
		case "Step":
			bg = `bg-${steps[action.step_id - 1].slug}`;
			break;
		case "Tag":
			bg = `bg-${tags[action.tag_id - 1].slug}`;
			break;
	}

	return (
		<Link
			to={`/dashboard/${action.account?.slug}/${action.id}`}
			className={`${
				small ? "text-xx" : ""
			} mb-2 flex items-center justify-between gap-2 rounded-md bg-gray-100 py-1 px-2 font-semibold tracking-tight text-gray-700 lg:text-xs ${bg}`}
		>
			<span className="relative flex min-w-0 items-center gap-1">
				{isLate(action.start ?? action.end, action.step_id) && (
					<span className="block h-1 w-1 shrink-0 animate-pulse rounded-full bg-error-500"></span>
				)}
				<span
					className={`overflow-hidden text-ellipsis ${
						small ? "whitespace-nowrap" : "lg:whitespace-nowrap"
					}`}
				>
					{action.name}
				</span>
			</span>
			<span
				className={`${
					small ? "hidden" : ""
				} text-xx font-medium opacity-75 sm:block`}
			>
				{!action.start
					? dayjs(action.end).minute() === 0
						? dayjs(action.end).format("HH[h]")
						: dayjs(action.end).format("HH[h]mm")
					: null}
			</span>
		</Link>
	);
}

export function ActionGrid({
	action,
	className,
}: {
	action: ActionType;
	className?: string;
}) {
	return (
		<div
			className={` group flex aspect-square flex-col justify-between bg-white p-2 text-center ${
				className ? className : ""
			}`}
		>
			<div className="flex justify-between text-xs">
				<div>{writeDate(action.end)}</div>
				<div>
					<div className="flex gap-2 opacity-0 transition group-hover:opacity-100">
						<Avatar
							avatar={{ name: action.profile.name }}
							size="s"
						/>
						<Link
							to={`/dashboard/${action.account?.slug}/${action.id}`}
							className="button button-ghost flex p-0 text-xl text-gray-300 "
						>
							<HiOutlinePencil />
						</Link>
						<button
							type="submit"
							form={`action_form_${action.id}`}
							name="action"
							value="delete"
							className="button button-ghost p-0 text-xl text-gray-300"
						>
							<HiOutlineX />
						</button>
					</div>
				</div>
			</div>
			<div>
				<Form
					className="w-full"
					method="post"
					name="action_form"
					id={`action_form_${action.id}`}
				>
					{/* <input type="hidden" name="action" value="update" /> */}
					<input type="hidden" name="id" value={action.id} />
				</Form>
				<div className="font-semibold text-gray-700">{action.name}</div>
				{action.description ? (
					<div className="text-xs text-gray-400">
						{action.description}
					</div>
				) : null}
			</div>
			<div></div>
		</div>
	);
}
