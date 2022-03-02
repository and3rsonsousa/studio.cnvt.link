import { Fragment, ReactChild, useRef, useState } from "react";
import { Listbox, Menu } from "@headlessui/react";
import { IBasic } from "~/types";
import { HiCheckCircle } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { menu } from "~/lib/animations";
import { Form } from "remix";

type ListboxProps = {
	action_id: number;
	values: Array<IBasic>;
	selected?: IBasic;
	start?: boolean;
	end?: boolean;
	indicator?: boolean | ReactChild;
	columns?: 2 | 3;
	name: string;
	table: string;
};

let listboxButtonClasses = (slug: string, start?: boolean, end?: boolean) =>
	`text-xx relative w-full inline-block bg-gray-200 py-0.5 px-2 font-semibold uppercase relative tracking-wide transition-all overflow-hidden text-ellipsis whitespace-nowrap duration-300 focus:z-10 focus:border-interdimensional focus:outline-none focus:ring-4 focus:ring-interdimensional/30 ${
		start ? "rounded-l-full pl-3" : ""
	} ${end ? "rounded-r-full pr-3" : ""} ${slug}-bg`;

let listboxOptionsClasses = (
	start?: boolean,
	end?: boolean,
	columns?: 2 | 3
) => {
	let columns_classes = [
		,
		,
		" grid grid-cols-2 w-[19rem]",
		" grid grid-cols-3 w-[28rem]",
	];

	return `z-50 origin-top absolute rounded-lg backdrop-blur-md bg-gray-200/50 p-2 text-xs shadow-xl shadow-gray-500/20 outline-none ${
		start ? "left-16" : end ? "-left-16" : "left-1/2"
	} ${columns ? columns_classes[columns] : ""}`;
};

let listboxOptionClasses = (active: boolean, selected: boolean) =>
	`flex cursor-pointer items-center gap-2 rounded-md py-2 px-3 transition hover:bg-gray-500/20 ${
		active ? "bg-gray-500/20" : ""
	}`;

export const ListBox = ({
	action_id,
	values,
	selected,
	start,
	end,
	indicator,
	columns,
	name,
	table,
}: ListboxProps) => {
	let [option, setOption] = useState(selected || values[0]);

	return (
		<div className="left relative -mt-[5px]">
			<Listbox value={option} onChange={setOption} horizontal={!!columns}>
				{({ open }) => (
					<>
						<Form id={`form_${name}_${action_id}`} method="post">
							<input
								type="hidden"
								name="id"
								defaultValue={action_id}
							/>
							<input
								type="hidden"
								name={name}
								defaultValue={option.id}
							/>
							<input
								type="hidden"
								name="table"
								defaultValue={table}
							/>
						</Form>
						<Listbox.Button
							className={listboxButtonClasses(
								option.slug as string,
								start,
								end
							)}
						>
							{option.name}
						</Listbox.Button>
						<AnimatePresence>
							{open && (
								<Listbox.Options
									className={listboxOptionsClasses(
										start,
										end,
										columns
									)}
									static
									as={motion.div}
									key="dropdown"
									initial={menu.initial}
									animate={menu.animate}
									exit={menu.exit}
								>
									{values.map((value) => (
										<Listbox.Option
											value={value}
											key={value.id}
											as={Fragment}
										>
											{({ active, selected }) => (
												<div
													className={listboxOptionClasses(
														active,
														selected
													)}
												>
													{indicator ? (
														typeof indicator ===
														"boolean" ? (
															<div
																className={`${value.slug}-bg h-2 w-2 rounded-full`}
															></div>
														) : (
															indicator
														)
													) : null}
													<button
														className="flex w-full items-center justify-between"
														type="submit"
														form={`form_${name}_${action_id}`}
														name="_action"
														value={"update"}
													>
														{value.name}

														{selected && (
															<HiCheckCircle className="text-xl text-gray-400" />
														)}
													</button>
												</div>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							)}
						</AnimatePresence>
					</>
				)}
			</Listbox>
		</div>
	);
};

type DropdownProps = {
	values: Array<IBasic>;
	name: string | ReactChild;
};

export const Dropdown = ({ values, name }: DropdownProps) => {
	return (
		<Menu as={"div"} className="relative">
			<Menu.Button>{name}</Menu.Button>
			<Menu.Items
				className={`${listboxOptionsClasses()} right-0 left-auto`}
			>
				{values.map((value) => (
					<button
						className={listboxOptionClasses(false, false)}
						key={value.id}
					>
						{value.name}
					</button>
				))}
			</Menu.Items>
		</Menu>
	);
};
