import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useFetcher } from "remix";
import { ActionType } from "~/types";

dayjs.extend(relativeTime);
import "dayjs/locale/pt-br"; // import locale
import { isLate } from "~/lib/functions";
import { flows, steps, tags } from "~/lib/data";
import { HiDotsHorizontal } from "react-icons/hi";
dayjs.locale("pt-br");

export type ActionProps = {
	action: ActionType;
};

export default function Action({ action }: ActionProps) {
	let fetcher = useFetcher();
	let flow = flows[action.flow_id - 1];
	let step = steps[action.step_id - 1];
	let tag = tags[action.tag_id - 1];

	return (
		<div
			className={`self-start rounded-xl bg-white px-4 py-3 text-sm shadow`}
		>
			<fetcher.Form method="post">
				{/* Name of the Action */}
				<div>
					<input
						type="text"
						name="name"
						className="w-full text-lg font-bold tracking-tight text-gray-900 transition focus:text-brand-600 focus:outline-none"
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
				<div className="my-2 flex flex-wrap gap-1 text-xs">
					{action.start ? (
						<>
							<div className="order-1 whitespace-nowrap">
								{dayjs(action.start).format("D") +
									(dayjs(action.start).format("MMMM YYYY") !==
									dayjs(action.end).format("MMMM YYYY")
										? dayjs(action.start).format(
												" [de] MMMM"
										  )
										: "") +
									(dayjs(action.start).year() !==
									dayjs(action.end).year()
										? dayjs(action.start).format(
												"[ de] YYYY"
										  )
										: "") +
									" a"}
							</div>

							<div className="order-3 whitespace-nowrap text-gray-400">
								({dayjs(action.start).to(action.end, true)})
							</div>

							<div
								className={`order-4 ${
									isLate(action.start) ? "text-error-500" : ""
								}`}
							>
								{/* {action.start ? " e " : ""} */}
								{dayjs(action.start).fromNow(true) +
									(isLate(action.start) ? " em atraso" : "")}
							</div>
						</>
					) : (
						<div
							className={`order-4 ${
								isLate(action.end) ? "text-error-500" : ""
							}`}
						>
							{"- "}
							{/* {action.start ? " e " : ""} */}
							{dayjs(action.end).fromNow() +
								(isLate(action.end) ? " em atraso" : "")}
						</div>
					)}
					<div className="order-2 whitespace-nowrap">
						{dayjs(action.end).format("D [de] MMMM") +
							(dayjs(action.end).year() !== dayjs().year() ||
							(action.start &&
								dayjs(action.start).year() !==
									dayjs(action.end).year())
								? dayjs(action.end).format(
										"[ de] YYYY [às] H[:]mm"
								  )
								: dayjs(action.end).format(" [às] H[:]mm"))}
					</div>
				</div>
				{/* 
        Flow
        Step
        Tag 
        */}
				<div className="flex items-end justify-between gap-2">
					<div className="flex">
						<div
							className={`bg-${flow.slug}-light badge badge-small rounded-r-none`}
						>
							{flow.name}
						</div>
						<div
							className={`bg-${step.slug}-light badge badge-small rounded-none`}
						>
							{step.name}
						</div>
						<div
							className={`bg-${tag.slug}-light badge badge-small rounded-l-none`}
						>
							{tag.name}
						</div>
					</div>
					<div>
						<div className="">
							<HiDotsHorizontal className="text-lg" />
						</div>
					</div>
				</div>
				{/* Ações */}
			</fetcher.Form>
		</div>
	);
}
