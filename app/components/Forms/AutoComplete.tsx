import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoTimeSharp } from "react-icons/io5";
import { listboxOptionsClasses, listboxOptionClasses } from ".";

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
	let [selectedItem, set_selectedItem] = useState(selected);
	let [query, set_query] = useState("");

	let filteredItems =
		query === ""
			? items
			: items.filter((item) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

	return (
		<div>
			<input type="hidden" name={name} value={selected} />
			<Combobox
				as="label"
				onChange={(value) => {
					console.log(value);

					set_selectedItem(value);
				}}
				className="field"
				value={selectedItem}
			>
				<span>{label}</span>
				<div className="input">
					<Combobox.Input
						placeholder={placeholder ?? "Comece a digitar para ver as opções"}
						onChange={(event) => {
							set_query(event.target.value);
						}}
					/>
				</div>
				<Combobox.Options static className={listboxOptionsClasses()}>
					{filteredItems.length > 0 ? (
						filteredItems.map((item) => (
							<Combobox.Option key={item.id} value={item} as={Fragment}>
								{({ active, selected }) => (
									<div className={listboxOptionClasses(active, selected)}>{item.name}</div>
								)}
							</Combobox.Option>
						))
					) : (
						<div className="p-2 text-center text-gray-400 lg:px-4">Nenhum item corresponde à sua busca</div>
					)}
				</Combobox.Options>
			</Combobox>
		</div>
	);
}
