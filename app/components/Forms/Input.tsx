import { useState } from "react";

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
	disable?: boolean;
	before?: (value?: string) => JSX.Element;
	after?: (value?: string) => JSX.Element;
}

export const Input = ({
	label,
	type,
	name,
	value,
	disable,
	before,
	after,
}: InputProps) => {
	let [isDisable, setIsDisable] = useState(disable);
	let [_value, set_value] = useState(value);
	return (
		<label className="field">
			<span>
				{label}
				{disable !== undefined ? (
					<input
						type="checkbox"
						className="ml-2 inline-block"
						checked={!isDisable}
						onChange={() => setIsDisable(!isDisable)}
					/>
				) : null}
			</span>
			<div className="input">
				{before && before(_value)}
				{type === "textarea" ? (
					<textarea
						name={name}
						rows={3}
						disabled={isDisable}
						className="input-field"
						onChange={(event) => set_value(event.target.value)}
						defaultValue={value}
					/>
				) : (
					<input
						type={type}
						name={name}
						defaultValue={value}
						disabled={isDisable}
						className="input-field"
						onChange={(event) => set_value(event.target.value)}
					/>
				)}
				{after && after(_value)}
			</div>
		</label>
	);
};
