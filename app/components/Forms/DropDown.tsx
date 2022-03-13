import { ReactChild } from "react";
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
			<Menu.Items className={`dropdown-menu right-0 left-auto`}>
				{values.map((value) => (
					<button className={`dropdown-link`} key={value.id}>
						{value.name}
					</button>
				))}
			</Menu.Items>
		</Menu>
	);
};
