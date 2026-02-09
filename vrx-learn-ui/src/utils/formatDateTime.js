export default function formatDateTime(dueDate, dueTime) {
  const dateTime = new Date(`${dueDate}T${dueTime}`);

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const today = new Date();
  const isToday =
    dateTime.toDateString() === today.toDateString();

  return isToday ? `${time} (Today)` : time;
}
