export interface CheckboxGroupProps {
	label: string;
	name: string;
	items: Array<{ id: number; name: string; value?: string | number }>;
	selected?: string[];
	columns?: number;
}

export const CheckboxGroup = ({ label, name, items, selected = [], columns = 2 }: CheckboxGroupProps) => {
	// console.log(items, selected);

	return (
		<fieldset className="field-group">
			<span>{label}</span>
			<div className={`${columns === 2 ? "grid-cols-2" : "grid-cols-3"} space-y-2 md:grid md:gap-4 md:space-y-0`}>
				{items.map((item) => (
					<label key={item.id}>
						<input
							type="checkbox"
							name={name}
							value={item.value ?? item.id}
							defaultChecked={
								selected
									? selected.filter(
											(value) => {
												return String(item.value ?? item.id) === String(value);
											}
											// Array.isArray(item)
											// 	? item.user_id.filter(
											// 			(user) => user === id
											// 	  ).length > 0
											// 	: id === item.user_id
									  ).length > 0
									: false
							}
						/>
						<span>{item.name}</span>
					</label>
				))}
			</div>
		</fieldset>
	);
};
