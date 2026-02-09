import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
} from "date-fns";
import { useState } from "react";

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthDate = new Date();
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    const startDayIndex = getDay(monthStart);




    const daysInMonth = eachDayOfInterval({
        start: monthStart,
        end: monthEnd,
    });

    const emptyDays = Array.from({ length: startDayIndex });


    return (
        <>
            <div className="mb-2 flex items-center">
                <select className="rounded-md px-1 py-1 text-sm" onChange={() => setSelectedDate()}>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                </select>

                <select className="rounded-md px-2 py-1 text-sm">
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                </select>
            </div>
            <div className="grid grid-cols-7 justify-between text-center text-xs text-muted-foreground text-[#808080]">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>
            <div className="grid grid-cols-7">

                {emptyDays.map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {daysInMonth.map(day => (
                    <div
                        key={day.toString()}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-sm hover:bg-muted"
                    >
                        {day.getDate()}
                    </div>
                ))}
            </div>
        </>
    )

}