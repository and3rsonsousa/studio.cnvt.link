import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // import locale
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { HiChevronDoubleRight, HiDotsHorizontal } from "react-icons/hi";
import { Link, useFetcher } from "remix";
import { flows, steps, tags } from "~/lib/data";
import { isLate } from "~/lib/functions";
import { ActionType } from "~/types";
import { ListBox } from "./Forms";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export type ActionProps = {
	action: ActionType;
	size: "x" | "s" | "n";
};

export default function Action({ action, size = "n" }: ActionProps) {
	let fetcher = useFetcher();

	let [timeInfo, set_timeInfo] = useState(true);

	return (
		<>
			<div
				className={`h-4 rounded-xl border bg-brand-600 shadow shadow-gray-500/30 ${
					size === "x" ? "lg:hidden" : "hidden"
				}`}
			></div>
			<div
				className={`${size === "x" ? "hidden" : ""} self-start border bg-white lg:block ${
					size !== "n" ? "rounded-lg p-2 py-1 " : "min-w-fit rounded-xl px-4 py-3 "
				} text-sm ring-brand-600/20 transition focus-within:border-brand-600 focus-within:ring-4 focus-within:duration-500 `}
			>
				{/* Name of the Action */}
				<div className="flex">
					<input
						type="text"
						name="name"
						className={`w-full ${
							size === "x" ? "" : "text-lg"
						} w-full font-semibold tracking-tight text-gray-900 transition focus:outline-none`}
						defaultValue={action.name}
						autoComplete="off"
					/>
					<Link to={`/dashboard/action/${action.id}`} className="button button-ghost button-small -mr-2 px-2">
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
				{size === "n" && (
					<div className="flex">
						<div
							className="mb-2 flex cursor-pointer flex-wrap gap-1 text-xs"
							onClick={() => set_timeInfo(!timeInfo)}
						>
							{timeInfo ? (
								action.start ? (
									<div className={`${isLate(action.start) ? "text-error-500" : ""}`}>
										{dayjs(action.start).fromNow(true) + (isLate(action.start) ? " em atraso" : "")}
									</div>
								) : (
									<div className={`${isLate(action.end) ? "text-error-500" : ""}`}>
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

											<div className="order-3  whitespace-nowrap text-gray-400">
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
				)}
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
							small={size !== "n"}
						/>
						<ListBox
							item_id={action.id}
							values={steps}
							selected={steps.filter((step) => step.id === action.step_id)[0]}
							name="step_id"
							table="actions"
							small={size !== "n"}
						/>
						<ListBox
							item_id={action.id}
							values={tags}
							selected={tags.filter((tag) => tag.id === action.tag_id)[0]}
							end={true}
							columns={2}
							name="tag_id"
							table="actions"
							small={size !== "n"}
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
