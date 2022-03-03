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
