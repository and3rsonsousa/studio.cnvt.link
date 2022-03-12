import { useState } from "react";

export interface InputProps {
	label: string;
	type: "text" | "password" | "textarea" | "email" | "datetime-local" | "date";
	name: string;
	value?: string;
	disable?: boolean;
}

export const Input = ({ label, type, name, value, disable }: InputProps) => {
	let [isDisable, setIsDisable] = useState(disable);
	return (
		<label className="field">
			<span>
				{label}{" "}
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
				{type === "textarea" ? (
					<textarea name={name} rows={3} disabled={isDisable}></textarea>
				) : (
					<input type={type} name={name} defaultValue={value} disabled={isDisable} />
				)}
			</div>
		</label>
	);
};
