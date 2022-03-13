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
	name: string;
	table: string;
};

export const ListBox = ({ item_id, values, selected, name, table }: ListboxProps) => {
	let [option, setOption] = useState(selected || values[0]);

	return (
		<div className="listbox">
			<Listbox
				value={option}
				onChange={(value) => {
					if (option.id !== value.id) {
						setOption(value);
					}
					return false;
				}}
			>
				{({ open }) => (
					<>
						<Form id={`form_${name}_${item_id}`} method="post">
							<input type="hidden" name="id" defaultValue={item_id} />
							<input type="hidden" name={name} defaultValue={option.id} />
							<input type="hidden" name="table" defaultValue={table} />
							<input type="hidden" name="action" value="update" />
						</Form>

						<Listbox.Button className={`listbox-button bg-${option.slug}`}>{option.name}</Listbox.Button>

						<AnimatePresence>
							{open && (
								<Listbox.Options
									className="dropdown-menu"
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
												// flex w-full items-center justify-between
												<button
													className={`dropdown-link${active ? " dropdown-link-active" : ""}`}
													type="submit"
													form={`form_${name}_${item_id}`}
													name="action"
													value={"update"}
												>
													{value.name}

													{selected && (
														<HiCheckCircle className="ml-2 text-xl text-brand-400" />
													)}
												</button>
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
