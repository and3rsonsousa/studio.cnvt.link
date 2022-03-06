import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // import locale
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useFetcher } from "remix";
import { flows, steps, tags } from "~/lib/data";
import { isLate } from "~/lib/functions";
import { ActionType } from "~/types";
import { ListBox } from "./Forms";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export type ActionProps = {
	action: ActionType;
	small?: boolean;
};

export default function Action({ action, small }: ActionProps) {
	let fetcher = useFetcher();
	// let flow = flows[action.flow_id - 1];
	// let step = steps[action.step_id - 1];
	// let tag = tags[action.tag_id - 1];

	let [timeInfo, set_timeInfo] = useState(true);

	return (
		<>
			<div className={`h-4 rounded bg-white shadow shadow-gray-500/30 ${small ? "lg:hidden" : "hidden"}`}></div>
			<div
				className={`${small ? "hidden" : ""} self-start border border-transparent bg-white lg:block ${
					small
						? "rounded-lg p-2 py-1 focus-within:shadow-xl "
						: "min-w-fit rounded-xl px-4 py-3 focus-within:shadow-2xl "
				} text-sm shadow shadow-gray-500/30 transition focus-within:shadow-gray-700/30 focus-within:duration-500`}
			>
				<fetcher.Form method="post">
					{/* Name of the Action */}
					<div>
						<input
							type="text"
							name="name"
							className={`w-full ${
								small ? "" : "text-lg"
							} font-semibold tracking-tight text-gray-900 transition focus:outline-none`}
							defaultValue={action.name}
							autoComplete="off"
						/>
					</div>
					{/* 
        Datas
          - Quando Começa
          - Quando termina 

        Prazos
          - Em quanto tempo Deve Começar/quanto tempo de atraso
          - Em quanto tempo deve terminar/Quanto tepo de Atraso 
        */}
					{!small && (
						<div className="flex">
							<div
								className="mb-2 flex cursor-pointer flex-wrap gap-1 text-xs"
								onClick={() => set_timeInfo(!timeInfo)}
							>
								{timeInfo ? (
									action.start ? (
										<div className={`${isLate(action.start) ? "text-error-500" : ""}`}>
											{dayjs(action.start).fromNow(true) +
												(isLate(action.start) ? " em atraso" : "")}
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
												(action.start &&
													dayjs(action.start).year() !== dayjs(action.end).year())
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
								small={small}
							/>
							<ListBox
								item_id={action.id}
								values={steps}
								selected={steps.filter((step) => step.id === action.step_id)[0]}
								name="step_id"
								table="actions"
								small={small}
							/>
							<ListBox
								item_id={action.id}
								values={tags}
								selected={tags.filter((tag) => tag.id === action.tag_id)[0]}
								end={true}
								columns={2}
								name="tag_id"
								table="actions"
								small={small}
							/>
						</div>
						{/* Ações */}
						<div>
							<div className="">
								<HiDotsHorizontal className="text-lg" />
							</div>
						</div>
					</div>
				</fetcher.Form>
			</div>
		</>
	);
}
