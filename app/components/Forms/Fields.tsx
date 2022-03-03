import { ReactChild, ReactComponentElement } from "react";
import { AccountType, ProfileType } from "~/types";

export interface InputProps {
	label: string;
	type:
		| "text"
		| "password"
		| "textarea"
		| "email"
		| "datetime-local"
		| "date";
	name: string;
	value?: string;
}

export interface CheckBoxGroupProps {
	label: string;
	name: string;
	items: [{ id: number; name: string; value: string | number }];
	selected?: string[];
	columns?: number;
}

export interface RadioGroupProps {
	label: string;
	name: string;
	items: Array<{ id: number; name: string; value?: string | number }>;
	selected?: string | number;
	columns?: number;
	component?: (item: {
		id: number;
		name: string;
		value?: string | number;
	}) => ReactChild;
}

export interface SelectProps {
	label: string;
	name: string;
	values: Array<{
		id?: number | string;
		user_id?: string | string[];
		name: string;
	}>;
	selected?: string | number;
}

export const Input = ({ label, type, name, value }: InputProps) => {
	return (
		<label className="field">
			<span>{label}</span>
			<div className="input">
				{type === "textarea" ? (
					<textarea name={name} rows={3}></textarea>
				) : (
					<input type={type} name={name} defaultValue={value} />
				)}
			</div>
		</label>
	);
};

export const CheckBoxGroup = ({
	label,
	name,
	items,
	selected = [],
	columns = 2,
}: CheckBoxGroupProps) => {
	return (
		<fieldset className="field-group">
			<span>{label}</span>
			<div
				className={`${
					columns === 2 ? "grid-cols-2" : "grid-cols-3"
				} space-y-2 md:grid md:gap-4 md:space-y-0`}
			>
				{items.map((item) => (
					<label key={item.id}>
						<input
							type="checkbox"
							name={name}
							value={item.value}
							// defaultChecked={
							// 	selected
							// 		? selected.filter((id) =>
							// 				Array.isArray(item.user_id)
							// 					? item.user_id.filter(
							// 							(user) => user === id
							// 					  ).length > 0
							// 					: id === item.user_id
							// 		  ).length > 0
							// 		: false
							// }
						/>
						<span>{item.name}</span>
					</label>
				))}
			</div>
		</fieldset>
	);
};

export const RadioGroup = ({
	label,
	name,
	items,
	selected,
	columns = 2,
	component,
}: RadioGroupProps) => {
	return (
		<fieldset className="field-group">
			<span>{label}</span>
			<div
				className={`${
					columns === 2 ? "grid-cols-2" : "grid-cols-3"
				} space-y-2 md:grid md:gap-4 md:space-y-0`}
			>
				{items.map((item) =>
					component ? (
						component(item)
					) : (
						<label className="field-inline" key={item.id}>
							<input
								type="radio"
								name={name}
								value={item.value ?? item.id}
								defaultChecked={
									item.value
										? selected === item.value
										: selected === item.id
								}
							/>
							<span
								className={`w-full overflow-hidden text-ellipsis whitespace-nowrap`}
							>
								{item.name}
							</span>
						</label>
					)
				)}
			</div>
		</fieldset>
	);
};

export const SelectField = ({ label, name, values, selected }: SelectProps) => (
	<div className="field">
		<span>{name}</span>
		<div className="input">
			<select name={label}>
				<option></option>
				{values.map((item) => (
					<option value={item.id} key={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	</div>
);

export * from "./DropDown";
