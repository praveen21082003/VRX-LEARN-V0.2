
export default function formatDateTime(dateString) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const today = new Date();
  const isToday =
    dateTime.toDateString() === today.toDateString();

  return `${formattedDate}, ${isToday ? `${formattedTime} (Today)` : formattedTime}`;
}