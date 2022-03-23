import { supabase } from "./supabase";

export async function handleActionDB(request: Request) {
	const formData = await request.formData();

	let { action } = Object.fromEntries(formData);

	// console.log(action, formData);

	// return null;

	if (action === "update") {
		let { ...values } = Object.fromEntries(formData);

		let id: number = Number(values.id),
			name = values.name,
			campaign_id: number = Number(values.campaign_id),
			description: string = values.description,
			account_id: string = values.account_id,
			user_id: string = values.user_id,
			flow_id: string = values.flow_id,
			step_id: string = values.step_id,
			tag_id: string = values.tag_id,
			start: string = values.start,
			end: string = values.end;

		let updated = await supabase
			.from("actions")
			.update({
				name,
				campaign_id,
				description,
				account_id,
				user_id,
				flow_id,
				step_id,
				tag_id,
				start,
				end,
			})
			.eq("id", String(id));

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
	}
}
