import { ProfileType } from "~/types";

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
	values: ProfileType[];
	selected?: string[];
	columns?: number;
}

export interface RadioGroupProps {
	label: string;
	name: string;
	values: Array<{
		id?: number | string;
		user_id?: string | string[];
		name: string;
	}>;
	selected?: string | number;
	columns?: number;
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
			{type === "textarea" ? (
				<textarea name={name} rows={3}></textarea>
			) : (
				<input type={type} name={name} defaultValue={value} />
			)}
		</label>
	);
};

export const CheckBoxGroup = ({
	label,
	name,
	values,
	selected = [],
	columns = 2,
}: CheckBoxGroupProps) => {
	return (
		<fieldset className="field">
			<span>{label}</span>
			<div
				className={`${
					columns === 2 ? "grid-cols-2" : "grid-cols-3"
				} space-y-2 md:grid md:gap-4 md:space-y-0`}
			>
				{values.map((value) => (
					<label className="field-inline" key={value.id}>
						<input
							type="checkbox"
							name={name}
							value={value.user_id}
							defaultChecked={
								selected.filter((id) => id === value.user_id)
									.length > 0
							}
						/>
						<span>{value.name}</span>
					</label>
				))}
			</div>
		</fieldset>
	);
};

export const RadioGroup = ({
	label,
	name,
	values,
	selected,
	columns = 2,
}: RadioGroupProps) => {
	return (
		<fieldset className="field">
			<span>{label}</span>
			<div
				className={`${
					columns === 2 ? "grid-cols-2" : "grid-cols-3"
				} space-y-2 md:grid md:gap-4 md:space-y-0`}
			>
				{values.map((value) => (
					<label className="field-inline" key={value.id}>
						<input
							type="radio"
							name={name}
							value={value.user_id || value.id}
							defaultChecked={
								value.user_id
									? selected === value.user_id
									: selected === value.id
							}
						/>
						<span
							className={`w-full overflow-hidden text-ellipsis whitespace-nowrap`}
						>
							{value.name}
						</span>
					</label>
				))}
			</div>
		</fieldset>
	);
};

export const SelectField = ({ label, name, values, selected }: SelectProps) => (
	<div className="field">
		<span>{name}</span>
		<select name={label}>
			<option></option>
			{values.map((item) => (
				<option value={item.id} key={item.id}>
					{item.name}
				</option>
			))}
		</select>
	</div>
);

export * from "./DropDown_ListBox";
