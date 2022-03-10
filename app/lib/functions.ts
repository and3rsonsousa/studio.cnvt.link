import dayjs from "dayjs";

export function isLate(date: string) {
	return dayjs(date).isBefore(dayjs());
}

export function isToday(date: string) {
	return dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
}

export function isFuture(date: string) {
	return dayjs(date).isAfter(dayjs()) && dayjs(date).day() !== dayjs().day();
}
