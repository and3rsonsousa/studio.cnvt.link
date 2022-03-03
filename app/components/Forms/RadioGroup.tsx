import { ReactChild } from "react";

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
