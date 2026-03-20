import React from "react";
import { Avatar } from "@/components/ui";
import StatusPill from "./StatusPill";

function CardView({ data }) {
    const formatDateTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // This will produce "14 Feb 2026"
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

  return (
    <div className="flex flex-col md:hidden">
      {data.map((row) => (
        <div
          key={row.id}
          className="flex items-start gap-3 w-full relative p-4 border-b border-default bg-white"
        >
          <Avatar name={row.name } />
          <div className="flex flex-col gap-0">
            <p className="font-sm text-main">{row.name}</p>
            <p className="text-xs text-muted">{row.email}</p>
            {row.enrollment_date && (
              <p className="text-xs text-muted mt-1">
                Enrolled On : {formatDateTime(row.enrollment_date)}
              </p>
            )}
          </div>
         
          <StatusPill status={row.role} />
        </div>
      ))}
    </div>
  );
}

export default CardView;
