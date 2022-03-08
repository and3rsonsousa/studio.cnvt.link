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

export const SelectField = ({ label, name, values, selected }: SelectProps) => (
	<div className="field">
		<span>{name}</span>
		<div className="input">
			<select name={label}>
				<option></option>
				{values.map((item) => (
					<option value={item.id} key={item.id} selected={item.id === selected}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	</div>
);
