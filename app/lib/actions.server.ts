import { supabase } from "~/lib/supabase";

export const handleUpdate = async (table: string, values: any, id: string) => {
	let obj: any = {};

	// console.log(id);

	for (const key in values) {
		if (Object.prototype.hasOwnProperty.call(values, key)) {
			if (key != "id" && key != "table" && key != "action") {
				obj[key] = values[key];
			}
		}
	}

	let updatedRow = await supabase
		.from(table)
		.update({ ...obj })
		.eq("id", parseInt(id));

	return updatedRow;
};

export const handleDelete = async (table: string, values: any, id: string) => {
	return "deleted";
};
