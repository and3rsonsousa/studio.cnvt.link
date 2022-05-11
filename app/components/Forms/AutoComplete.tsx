import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";
import removeAccent from "remove-accents";

export type ItemType = {
	id: number;
	name: string;
};

export type AutoCompleteProps = {
	label: string;
	name: string;
	items: Array<ItemType>;
	selected?: string | number;
	placeholder?: string;
	form?: string;
	before?: (value?: ItemType) => JSX.Element;
	after?: (value?: ItemType) => JSX.Element;
};

export function AutoComplete({
	label,
	name,
	items,
	selected,
	placeholder,
	form,
	before,
	after,
}: AutoCompleteProps) {
	let [selectedItem, setSelectedItem] = useState(
		selected ? items.filter((item) => item.id === selected)[0] : undefined
	);

	let [query, setQuery] = useState("");

	let filteredItems =
		query === ""
			? items
			: items.filter((item) =>
					removeAccent(item.name.toLocaleLowerCase()).includes(
						removeAccent(query.toLocaleLowerCase())
					)
			  );

	return (
		<div>
			<input type="hidden" name={name} value={selectedItem?.id} />
			<Combobox
				as="label"
				className="field"
				value={selectedItem}
				onChange={setSelectedItem}
			>
				<span>{label}</span>
				<div className="input">
					{before && before(selectedItem)}
					<Combobox.Input
						placeholder={
							placeholder ?? "Comece a digitar para ver as opções"
						}
						onChange={(event) => {
							setQuery(event.target.value);
						}}
						displayValue={(item: ItemType) => {
							return item?.name;
						}}
						autoComplete="off"
						className="input-field"
					/>
					{after && after(selectedItem)}
					<Combobox.Button className="button button-ghost button-icon">
						<HiOutlineSelector className="text-xl" />
					</Combobox.Button>
				</div>
				<Combobox.Options className="dropdown-menu w-full">
					{filteredItems.length === 0 && query !== "" ? (
						<div className="p-2 text-center text-sm text-gray-300 lg:px-4">
							<div>Nenhum item corresponde à sua busca</div>
							{form && (
								<button
									type="submit"
									form={form}
									className="button button-small button-dark mt-4"
								>
									Deseja criar {query}?
								</button>
							)}
						</div>
					) : (
						filteredItems.map((item) => (
							<Combobox.Option
								key={item.id}
								value={item}
								as={Fragment}
							>
								{({ active }) => (
									<div
										className={`dropdown-link ${
											active
												? " dropdown-link-active"
												: ""
										}`}
									>
										{item.name}
									</div>
								)}
							</Combobox.Option>
						))
					)}
				</Combobox.Options>
			</Combobox>
		</div>
	);
}
