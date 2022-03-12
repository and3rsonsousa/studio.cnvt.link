import { ReactChild } from "react";
import { HiArrowDown, HiCalculator, HiOutlineCalculator, HiX } from "react-icons/hi";

export default function Components() {
	return (
		<div className="p-8">
			<Heading title="Texts" subtitle="Headings" />
			<div>
				<Code>h1</Code> <h1>Lorem ipsum dolor sit amet.</h1>
				<Code>h2</Code> <h2>Quod molestias officiis quas nihil?</h2>
				<Code>h3</Code> <h3>Ut expedita sit non labore?</h3>
				<Code>h4</Code> <h4>Assumenda, hic. Odio, aperiam libero!</h4>
				<Code>h5</Code> <h5>Culpa molestias reprehenderit reciendis molestiae.</h5>
				<Code>h6</Code> <h6>Laudantium, dolorem iure! Cumque, sequi!</h6>
			</div>
			<Heading subtitle="Sizes" />
			<div>
				<Code>.text-xx</Code>

				<p className="text-xx">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, magnam rerum maiores nihil
					obcaecati fugiat quam qui, ducimus culpa quisquam at sequi perferendis ut? Voluptate tempore sed ut
					deserunt consectetur!
				</p>

				<Code>.text-xxx</Code>

				<p className="text-xxx">
					Eligendi quaerat eveniet quos pariatur! Ad doloribus ipsa perspiciatis, a repellat molestiae modi
					et, facere hic, autem veniam minima. Iure molestias itaque neque veritatis optio nemo unde
					praesentium quod dolor.
				</p>
			</div>
			<Heading title="Components" subtitle="Buttons" />
			<div className="space-y-4">
				<div className="flex gap-8">
					<div>
						<div>
							<Code> .button </Code>
						</div>
						<button className="button">Button</button>
					</div>
					<div>
						<div>
							<Code> .button.button-primary </Code>
						</div>
						<button className="button button-primary">Primary</button>
					</div>
					<div>
						<div>
							<Code> .button.button-ghost </Code>
						</div>
						<button className="button button-ghost">Primary</button>
					</div>
				</div>
				<div className="flex gap-8">
					<div>
						<div>
							<Code> .button.button-small </Code>
						</div>
						<button className="button button-small">Button</button>
					</div>
					<div>
						<div>
							<Code> .button.button-primary.button-large </Code>
						</div>
						<button className="button button-primary button-large">Primary</button>
					</div>
				</div>
				<div className="flex gap-8">
					<div>
						<div>
							<Code> .button.button-icon </Code>
						</div>
						<button className="button button-icon button-small">
							<HiX />
						</button>
					</div>
					<div>
						<div>
							<Code> .button.button-icon.button-primary </Code>
						</div>
						<button className="button button-icon button-primary">
							<HiArrowDown />
						</button>
					</div>
					<div>
						<div>
							<Code> .button.button-icon.rounded-full </Code>
						</div>
						<button className="button button-icon button-large rounded-full">
							<HiOutlineCalculator />
						</button>
					</div>
				</div>
			</div>
			<Heading subtitle="Forms" />
			<div className="flex gap-8">
				<div>
					<Code block={true}>
						{`<label class="field">\n\t<span>Label</span>\n\t<input type="text" placeholder="input text" className="input-field"/>\n</label>`}
					</Code>
					<label className="field">
						<span>Label</span>
						<input type="text" placeholder="input text" className="input-field" />
					</label>
					<p className="mt-4">
						Use <Code>.field</Code> with:
						<pre className="whitespace-pre-wrap text-sm font-bold ">
							text, email, url, password, number, date, datetime-local, month, search, tel, time, week,
							multiple, textarea, select
						</pre>
					</p>
				</div>
				<div>
					<Code block={true}>
						{`<label class="field">\n\t<span>Select</span>\n\t<select>\n\t\t<option/>...\n\t</select>\n</label>`}
					</Code>
					<label className="field">
						<span>Select</span>
						<select>
							<option value="">Lorem, ipsum dolor.</option>
							<option value="">Similique, laudantium officia.</option>
							<option value="">Facere, aut odio.</option>
						</select>
					</label>
				</div>
			</div>
		</div>
	);
}

function Code({ children, block = false }: { children: ReactChild; block?: true | false }) {
	return (
		<pre
			className={`bg-rose-100 text-rose-600 mb-2 mt-4 whitespace-pre-wrap rounded-md text-sm font-bold ${
				block ? "block p-8" : " inline-block px-1 py-0.5"
			}`}
		>
			{children}
		</pre>
	);
}

function Heading({ title, subtitle }: { title?: string; subtitle?: string }) {
	return (
		<div className="my-8 border-b">
			{title && <h1 className="text-brand-600">{title}</h1>}
			{subtitle && <h3 className="text-gray-700 ">{subtitle}</h3>}
		</div>
	);
}
