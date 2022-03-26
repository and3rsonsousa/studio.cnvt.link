import { flows, steps, tags } from "~/lib/data";
import { BasicType } from "~/types";

export default function () {
	return (
		<div className="p-8">
			<div className="container mx-auto grid grid-cols-3 gap-8">
				<div className="space-y-4">
					<h3>Flows</h3>
					{flows.map((flow) => (
						<Color item={flow} key={flow.id} />
					))}
				</div>
				<div className="space-y-4">
					<h3>Steps</h3>
					{steps.map((step) => (
						<Color item={step} key={step.id} />
					))}
				</div>
				<div className="space-y-4">
					<h3>Tags</h3>
					{tags.map((tag) => (
						<Color item={tag} key={tag.id} />
					))}
				</div>
				{/* Nova linha */}
				<div className="space-y-4">
					<h3>Flows</h3>
					{flows.map((flow) => (
						<ColorItem item={flow} key={flow.id} />
					))}
				</div>
				<div className="space-y-4">
					<h3>Steps</h3>
					{steps.map((step) => (
						<ColorItem item={step} key={step.id} />
					))}
				</div>
				<div className="space-y-4">
					<h3>Tags</h3>
					{tags.map((tag) => (
						<ColorItem item={tag} key={tag.id} />
					))}
				</div>
			</div>
		</div>
	);
}

function Color({ item }: { item: BasicType }) {
	return (
		<div className="flex overflow-hidden rounded">
			{[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((index) => (
				<div
					key={index}
					className={`w-full p-4 bg-${item.slug}-${index}`}
				/>
			))}
		</div>
	);
}

function ColorItem({ item }: { item: BasicType }) {
	return (
		<div className="flex gap-2">
			<div className={`w-full rounded px-4 py-2 bg-${item.slug}`}>
				{item.name}
			</div>
			<div className={`w-full rounded px-4 py-2 bg-${item.slug}-light`}>
				{item.name}
			</div>
		</div>
	);
}

/* 

account
planning
copy
creative
financial

idea
do
doing
review
done
accomplished

post
stories
reels
meeting
copywriting
video
shooting
press
task
tiktok

*/
