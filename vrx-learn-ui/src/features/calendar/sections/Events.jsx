import { format } from "date-fns";
import clsx from "clsx";


export default function Events({ events = [] }) {
    return (
        <div className="space-y-2 py-2 w-full">
            {events.map(event => {
                const formattedDate = format(new Date(event.date), "d");
                const formattedDay = format(new Date(event.date), "EEE")

                return (
                    <div key={event.id} className="flex gap-4 rounded-xl bg-white px-4 py-2">
                        <div className="flex flex-col justify-center w-7 items-center">
                            <span className="text-sm">{formattedDay}</span>
                            <span className="text-lg font-semibold">{formattedDate}</span>
                        </div>
                        <div className={`w-1.5 rounded-full ${event.color}`}/>
                        <div className="flex flex-col justify-center">
                            <span className="font-semibold text-sm">{event.title}</span>
                            <span className="text-sm">{event.time}</span>
                        </div>

                    </div>
                )
            })}
        </div>
    );
}
