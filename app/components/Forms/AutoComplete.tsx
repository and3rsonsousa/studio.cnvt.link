import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { listboxOptionClasses, listboxOptionsClasses } from ".";
import removeAccent from "remove-accents";

export type ItemType = {
	id: number;
	name: string;
};

export type AutoCompleteType = {
	label: string;
	name: string;
	items: Array<ItemType>;
	selected?: string | number;
	placeholder?: string;
};

export function AutoComplete({ label, name, items, selected, placeholder }: AutoCompleteType) {
	let [selectedItem, set_selectedItem] = useState(
		selected ? items.filter((item) => item.id === selected)[0] : undefined
	);
	let [query, set_query] = useState("");

	let filteredItems =
		query === ""
			? items
			: items.filter((item) =>
					removeAccent(item.name.toLocaleLowerCase()).includes(removeAccent(query.toLocaleLowerCase()))
			  );

	return (
		<div>
			<input type="hidden" name={name} value={selectedItem?.id} />
			<Combobox as="label" className="field" value={selectedItem} onChange={set_selectedItem}>
				<span>{label}</span>
				<div className="input">
					<Combobox.Input
						placeholder={placeholder ?? "Comece a digitar para ver as opções"}
						onChange={(event) => {
							set_query(event.target.value);
						}}
						displayValue={(item: ItemType) => item.name}
						autoComplete="off"
					/>
				</div>
				<Combobox.Options className={listboxOptionsClasses()}>
					{filteredItems.length === 0 && query !== "" ? (
						<div className="p-2 text-center text-gray-400 lg:px-4">Nenhum item corresponde à sua busca</div>
					) : (
						filteredItems.map((item) => (
							<Combobox.Option key={item.id} value={item} as={Fragment}>
								{({ active, selected }) => (
									<div className={listboxOptionClasses(active, selected)}>{item.name}</div>
								)}
							</Combobox.Option>
						))
					)}
				</Combobox.Options>
			</Combobox>
		</div>
	);
}
