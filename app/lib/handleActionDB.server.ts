import { supabase } from "./supabase";

export async function handleActionDB(request: Request) {
	const formData = await request.formData();

	let { action } = Object.fromEntries(formData);

	console.log(action, formData);

	if (action === "update") {
		let { id, action, table, ...values } = Object.fromEntries(formData);

		let updated = await supabase
			.from("actions")
			.update({ ...values })
			.eq("id", String(id));

		return updated;
	} else if (action === "delete") {
		let { id } = Object.fromEntries(formData);
		let deleted = await supabase.from("actions").delete().eq("id", String(id));
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
	}
}
