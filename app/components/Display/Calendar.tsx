import dayjs from "dayjs";
import { useState } from "react";
import { BsGrid, BsGrid3X2 } from "react-icons/bs";
import { HiOutlineCalendar, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { MdOutlineViewDay, MdOutlineViewWeek } from "react-icons/md";
import { ActionType } from "~/types";
import Action from "../Action";
import DayView from "./Calendar/DayView";
import { MonthView } from "./Calendar/MonthView";
import WeekView from "./Calendar/WeekView";
import YearView from "./Calendar/YearView";
import { Heading } from "./Display";

type CalendarProps = {
	actions: ActionType[];
};

export default function Calendar({ actions }: CalendarProps) {
	let [view, set_view] = useState(1);

	return (
		<div>
			<Heading title="Calendário" />
			{view === 1 && <MonthView actions={actions} />}
			{view === 2 && <WeekView actions={actions} />}
			{view === 3 && <DayView actions={actions} />}
			{view === 4 && <YearView actions={actions} />}
		</div>
	);
}
