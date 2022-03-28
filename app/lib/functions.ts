import dayjs, { Dayjs } from "dayjs";

export function isLate(date: string, step?: number) {
	return dayjs(date).isBefore(dayjs()) && step !== 6;
}

export function isToday(date: string | Dayjs) {
	return dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
}

export function isFuture(date: string) {
	return dayjs(date).isAfter(dayjs()) && dayjs(date).day() !== dayjs().day();
}

export function writeDate(date: string, reference?: string) {
	let datejs = dayjs(date);
	let referencejs = reference ? dayjs(reference) : dayjs();

	return (
		datejs.format("D") +
		(datejs.format("MMMM YYYY") !== referencejs.format("MMMM YYYY")
			? datejs.format(" [de] MMMM")
			: "") +
		(datejs.year() !== referencejs.year()
			? datejs.format("[ de] YYYY")
			: "")
	);
}
