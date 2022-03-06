import { Listbox } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, ReactChild, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Form } from "remix";
import { menu } from "~/lib/animations";
import { BasicType } from "~/types";

type ListboxProps = {
	item_id: number;
	values: Array<BasicType>;
	selected?: BasicType;
	start?: boolean;
	end?: boolean;
	indicator?: boolean | ReactChild;
	columns?: 2 | 3;
	name: string;
	table: string;
	small?: boolean;
};

export let listboxButtonClasses = (slug: string, start?: boolean, end?: boolean) =>
	`text-xx relative w-full inline-block bg-gray-200 py-0.5 px-2 font-semibold uppercase relative tracking-wide transition-all overflow-hidden text-ellipsis whitespace-nowrap duration-300 focus:z-10 focus:outline-none focus-30 border-transparent ${
		start ? "rounded-l-full pl-3" : ""
	} ${end ? "rounded-r-full pr-3" : ""} bg-${slug}-light`;

export let listboxButtonSmallClasses = (slug: string, start?: boolean, end?: boolean) =>
	`h-2 w-4 transition bg-${slug}  ${start ? "rounded-l-full pl-3" : ""} ${end ? "rounded-r-full pr-3" : ""}`;

export let listboxOptionsClasses = (start?: boolean, end?: boolean, columns?: 2 | 3) => {
	let columns_classes = [, , " grid grid-cols-2 w-[19rem]", " grid grid-cols-3 w-[28rem]"];

	return `z-50 origin-top absolute rounded-xl bg-white py-2 text-xs shadow-2xl shadow-gray-500/30 outline-none ${"left-0"} ${
		columns ? columns_classes[columns] : ""
	}`;
};

export let listboxOptionClasses = (active: boolean, selected: boolean) =>
	`flex cursor-pointer items-center gap-2 py-2 px-3 transition hover:bg-brand-50 hover:text-brand-700 ${
		active ? "bg-brand-50 text-brand-700" : ""
	}`;

export const ListBox = ({
	item_id,
	values,
	selected,
	start,
	end,
	indicator,
	columns,
	name,
	table,
	small,
}: ListboxProps) => {
	let [option, setOption] = useState(selected || values[0]);

	return (
		<div className="left relative -mt-[5px]">
			<Listbox value={option} onChange={setOption} horizontal={!!columns}>
				{({ open }) => (
					<>
						<Form id={`form_${name}_${item_id}`} method="post">
							<input type="hidden" name="id" defaultValue={item_id} />
							<input type="hidden" name={name} defaultValue={option.id} />
							<input type="hidden" name="table" defaultValue={table} />
						</Form>
						{small ? (
							<Listbox.Button
								className={listboxButtonSmallClasses(option.slug as string, start, end)}
							></Listbox.Button>
						) : (
							<Listbox.Button className={listboxButtonClasses(option.slug as string, start, end)}>
								{option.name}
							</Listbox.Button>
						)}
						<AnimatePresence>
							{open && (
								<Listbox.Options
									className={listboxOptionsClasses(start, end, columns)}
									static
									as={motion.div}
									key="dropdown"
									initial={menu.initial}
									animate={menu.animate}
									exit={menu.exit}
								>
									{values.map((value) => (
										<Listbox.Option value={value} key={value.id} as={Fragment}>
											{({ active, selected }) => (
												<div className={listboxOptionClasses(active, selected)}>
													{indicator ? (
														typeof indicator === "boolean" ? (
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
														form={`form_${name}_${item_id}`}
														name="_action"
														value={"update"}
													>
														{value.name}

														{selected && (
															<HiCheckCircle className="ml-2 text-xl text-brand-400" />
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
