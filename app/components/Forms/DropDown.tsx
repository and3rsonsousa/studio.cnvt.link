import { Fragment, ReactChild } from "react";
import { Menu } from "@headlessui/react";
import { BasicType } from "~/types";

type DropdownProps = {
	values: Array<BasicType>;
	name: string | ReactChild;
};

export const Dropdown = ({ values, name }: DropdownProps) => {
	return (
		<Menu as={"div"} className="relative">
			<Menu.Button>{name}</Menu.Button>
			<Menu.Items className={`dropdown-menu`}>
				{values.map((value) => (
					<Menu.Item as={Fragment} key={value.id}>
						{({ active }) => (
							<button className={`dropdown-link ${active ? " dropdown-link-active" : ""}`}>
								{value.name}
							</button>
						)}
					</Menu.Item>
				))}
			</Menu.Items>
		</Menu>
	);
};
