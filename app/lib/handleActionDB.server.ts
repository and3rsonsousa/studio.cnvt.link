import { supabase } from "./supabase";

export async function handleActionDB(request: Request) {
	const formData = await request.formData();

	let { action } = Object.fromEntries(formData);

	if (action === "update") {
		let { id, table, action, ...values } = Object.fromEntries(formData);

		// console.log({ action }, { values });

		let obj: any = {};

		for (let k in values) {
			if (values[k]) {
				if (/(campaign|flow|step|tag)_id$/.test(k)) {
					obj[k] = Number(values[k]);
				} else {
					obj[k] = String(values[k]);
				}
			}
		}

		// console.log({ obj });

		let { data: updated, error } = await supabase
			.from("actions")
			.update({
				...obj,
			})
			.eq("id", String(id));

		if (error) throw new Error(error.message);

		return updated;
	} else if (action === "delete") {
		let { id } = Object.fromEntries(formData);
		let deleted = await supabase
			.from("actions")
			.delete()
			.eq("id", String(id));
		return deleted;
	} else if (action === "new-action") {
		let { action, ...values } = Object.fromEntries(formData);

		if (values.name === "" || values.name === undefined) {
			return {
				error: { message: "Insira um título na sua ação." },
			};
		}

		if (values.account_id === undefined) {
			return {
				error: { message: "Defina um cliente para essa ação." },
			};
		}

		let created = await supabase.from("actions").insert({
			...values,
			campaign_id: values.campaign_id === "" ? null : values.campaign_id,
		});

		return created;
	} else {
		throw new Error("No action defined.");
	}
}
