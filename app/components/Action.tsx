import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // import locale
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { HiChevronDoubleRight, HiDotsHorizontal, HiOutlineChevronRight } from "react-icons/hi";
import { Link } from "remix";
import { flows, steps, tags } from "~/lib/data";
import { isLate } from "~/lib/functions";
import { ActionType } from "~/types";
import { ListBox } from "./Forms";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export type ActionProps = {
	action: ActionType;
};

// TODO Incluir Responsável caso seja outra pessoa
// TODO: Ação de deletar
// TODO: Ação de selecionar vários

export default function Action({ action }: ActionProps) {
	let [timeInfo, setTimeInfo] = useState(true);

	return (
		<>
			<div
				className={`min-w-fit self-start rounded-xl border border-transparent bg-white px-4 py-3 text-sm shadow shadow-gray-500/20 ring-1 ring-black/[.02] transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-600/20 focus-within:duration-500 lg:block`}
			>
				{/* Cliente e Campanha */}

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
				<div className="flex">
					<input
						type="text"
						name="name"
						className={`w-full text-lg font-semibold tracking-tight text-gray-900 transition focus:outline-none`}
						defaultValue={action.name}
						autoComplete="off"
					/>
					<Link
						to={`/dashboard/${action.account?.slug}/${action.id}`}
						className="button button-ghost button-small -mr-2 px-2"
					>
						<HiChevronDoubleRight />
					</Link>
				</div>
				{/* 
        Datas
          - Quando Começa
          - Quando termina 

        Prazos
          - Em quanto tempo Deve Começar/quanto tempo de atraso
          - Em quanto tempo deve terminar/Quanto tepo de Atraso 
        */}

				<div className="flex">
					<div
						className="mb-2 flex cursor-pointer flex-wrap gap-1 text-xs"
						onClick={() => setTimeInfo(!timeInfo)}
					>
						{timeInfo ? (
							action.start ? (
								<div
									className={`${
										isLate(action.start) ? "text-error-500 transition hover:text-error-700" : ""
									}`}
								>
									{dayjs(action.start).fromNow(true) + (isLate(action.start) ? " em atraso" : "")}
								</div>
							) : (
								<div
									className={`${
										isLate(action.end) ? "text-error-500 transition hover:text-error-700" : ""
									}`}
								>
									{dayjs(action.end).fromNow() + (isLate(action.end) ? " em atraso" : "")}
								</div>
							)
						) : (
							<>
								{action.start ? (
									<>
										<div className="order-1  whitespace-nowrap">
											{dayjs(action.start).format("D") +
												(dayjs(action.start).format("MMMM YYYY") !==
												dayjs(action.end).format("MMMM YYYY")
													? dayjs(action.start).format(" [de] MMMM")
													: "") +
												(dayjs(action.start).year() !== dayjs(action.end).year()
													? dayjs(action.start).format("[ de] YYYY")
													: "") +
												" a"}
										</div>

										<div className="order-3  whitespace-nowrap text-gray-400 transition hover:text-gray-700">
											({dayjs(action.start).to(action.end, true)})
										</div>
									</>
								) : null}
								<div className="order-2  whitespace-nowrap">
									{dayjs(action.end).format("D [de] MMMM") +
										(dayjs(action.end).year() !== dayjs().year() ||
										(action.start && dayjs(action.start).year() !== dayjs(action.end).year())
											? dayjs(action.end).format("[ de] YYYY [às] H[:]mm")
											: dayjs(action.end).format(" [às] H[:]mm"))}
								</div>
							</>
						)}
					</div>
				</div>

				{/* 
        Flow - Step - Tag 
        */}
				<div className="flex items-end justify-between gap-2">
					<div className="flex">
						<ListBox
							item_id={action.id}
							values={flows}
							selected={flows.filter((flow) => flow.id === action.flow_id)[0]}
							start={true}
							name="flow_id"
							table="actions"
						/>
						<ListBox
							item_id={action.id}
							values={steps}
							selected={steps.filter((step) => step.id === action.step_id)[0]}
							name="step_id"
							table="actions"
						/>
						<ListBox
							item_id={action.id}
							values={tags}
							selected={tags.filter((tag) => tag.id === action.tag_id)[0]}
							end={true}
							columns={2}
							name="tag_id"
							table="actions"
						/>
					</div>
					{/* Ações */}
					<div>
						<div className="">
							<HiDotsHorizontal className="text-lg" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export function ActionLink({ action }: { action: ActionType }) {
	return (
		<Link
			to={`/dashboard/${action.account?.slug}/${action.id}`}
			className={`text-xx justify-between gap-2 py-1 font-semibold tracking-tight text-gray-700 lg:text-xs`}
		>
			<span className="text-xx font-medium text-gray-400">
				{!action.start ? dayjs(action.end).format("HH[h]mm") : null}
			</span>
			<span className="relative flex items-center gap-1">
				{isLate(action.start ?? action.end) && (
					<span className="block h-1 w-1 shrink-0 animate-pulse rounded-full bg-error-500"></span>
				)}
				<span className="overflow-hidden text-ellipsis whitespace-nowrap">{action.name}</span>
			</span>
		</Link>
	);
}
