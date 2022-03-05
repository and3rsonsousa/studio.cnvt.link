import dayjs from "dayjs";

export function isLate(date: string) {
	return dayjs(date).isBefore(dayjs());
}

export function isFuture(date: string) {
	return dayjs(date).isAfter(dayjs()) && dayjs(date).day() !== dayjs().day();
}
