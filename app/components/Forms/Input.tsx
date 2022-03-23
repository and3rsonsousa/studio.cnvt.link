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
	after?: JSX.Element;
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
						className="inline-block"
						checked={!isDisable}
						onClick={() => setIsDisable(!isDisable)}
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
					></textarea>
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
				{after}
			</div>
		</label>
	);
};
