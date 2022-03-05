import { Dayjs } from "dayjs";
import { ReactChild } from "react";

export type ProfileType = {
	id: number;
	user_id: string;
	name: string;
	email: string;
	image?: string;
	role: number;
	account_id: number;
	accounts: AccountType[];
};

export type AccountType = {
	id: number;
	name: string;
	slug: string;
	user_id: string[];
	image?: string;
	colors?: string[];
	actions?: ActionType[];
};

export type ICampaign = {
	id: number;
	name: string;
	slug: string;
	account_id: number;
	action_id: number;
	created_by: string;
	start: string;
	end: string;
};

export type ActionType = {
	id: number;
	name: string;
	description: string;
	created_by: string;

	user_id: string;
	account_id: number;
	flow_id: number;
	step_id: number;
	tag_id: number;
	campaign_id: number;

	account?: AccountType;
	flows?: BasicType;
	status?: BasicType;
	tags?: BasicType;
	campaigns: ICampaign;

	start?: string;
	end: string;
	validating?: true | false;
};

export type BasicType = {
	id: number;
	name?: string | ReactChild;
	slug?: string;
};
