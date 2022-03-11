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
