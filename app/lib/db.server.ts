import { redirect } from "remix";
import dayjs from "dayjs";
import { AccountType, CampaignType, ProfileType } from "~/types";
import { ActionType } from "./../types";
import { supabase } from "./supabase";
import { IoTrendingUpOutline } from "react-icons/io5";

export async function getActionFormData(
	userId: string,
	slug?: string
): Promise<{
	accounts: Array<AccountType> | null;
	profiles: Array<ProfileType> | null;
	campaigns: Array<CampaignType> | null;
	actions: Array<ActionType> | null;
}> {
	//accounts
	let { data: accounts } = await supabase
		.from("accounts")
		.select("*, actions(*)")
		.contains("user_id", [userId])
		.order("name");

	let actions: ActionType[] = [];
	let account_ids: number[] = [];
	let user_ids =
		accounts
			?.map((account: AccountType) => {
				account.actions?.map((action) => {
					if (slug) {
						if (account.slug === slug) {
							actions.push({
								...action,
								account,
							});
						}
					} else {
						actions.push({
							...action,
							account,
						});
					}
				});
				account_ids.push(account.id);
				return account.user_id;
			})
			.flat() || [];

	let [{ data: profiles }, { data: campaigns }] = await Promise.all([
		supabase
			.from("profiles")
			.select("*")
			.in("user_id", user_ids)
			.order("name"),
		supabase
			.from("campaigns")
			.select("*")
			.in("account_id", account_ids)
			.order("name"),
	]);

	actions = actions.sort((a, b) =>
		dayjs(a.start ? a.start : a.end).diff(b.start ? b.start : b.end)
	);

	actions = actions.map((action) => ({
		...action,
		campaign: campaigns?.filter(
			(campaign) => campaign.id === action.campaign_id
		)[0],
		profile: profiles?.filter(
			(profile) => profile.user_id === action.user_id
		)[0],
	}));

	return { accounts, profiles, campaigns, actions };
}

export async function handleAction(request: Request) {
	let returning: {
		error?: { message: string };
		success?: boolean;
		payload?: any;
	} = {};

	const formData = await request.formData();

	let { action } = Object.fromEntries(formData);

	if (action === "update") {
		let { id, table, action, backTo, ...values } =
			Object.fromEntries(formData);

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

		let { data: updated, error } = await supabase
			.from("actions")
			.update({
				...obj,
			})
			.eq("id", String(id));

		if (error) throw new Error(error.message);

		returning = { success: true, payload: updated };

		return backTo ? redirect(backTo as string) : returning;
	} else if (action === "delete") {
		let { id, backTo } = Object.fromEntries(formData);
		let deleted = await supabase
			.from("actions")
			.delete()
			.eq("id", String(id));

		returning = { success: true, payload: deleted };
		return backTo ? redirect(backTo as string) : returning;
	} else if (action === "create") {
		let { action, backTo, ...values } = Object.fromEntries(formData);

		if (!values.name) {
			returning = {
				success: false,
				error: { message: "Insira um título na sua ação." },
			};
			return returning;
		}

		if (!values.account_id) {
			returning = {
				success: false,
				error: { message: "Defina um cliente para essa ação." },
			};
			return returning;
		}

		let { data: created, error } = await supabase.from("actions").insert({
			...values,
			campaign_id: values.campaign_id === "" ? null : values.campaign_id,
		});

		if (error) throw new Error(error.message);

		returning = { success: true, payload: created };
		return backTo ? redirect(backTo as string) : returning;
	} else {
		throw new Error("No action defined.");
	}
}
