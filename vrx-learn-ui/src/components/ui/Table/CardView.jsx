import React from "react";
import { Avatar } from "@/components/ui";
import StatusPill from "./StatusPill";

function CardView({ data, renderMobileCard }) {
  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // This will produce "14 Feb 2026"
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="flex flex-col md:hidden gap-4 ">
      {data.map((row) => (
        <div
          key={row.id}
          className="flex items-start justify-between gap-2 w-full p-4 border border-default rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="shrink-0 scale-90 origin-top-left">
              <Avatar name={row.name} />
            </div>

            <div className="flex flex-col gap-0.5 min-w-0 overflow-hidden">
              <p className="text-sm font-medium text-main truncate">
                {row.name}
              </p>
              <p className="text-[11px] text-muted truncate">{row.email}</p>
              {row.enrollment_date && (
                <p className="text-[10px] text-muted/80 mt-1">
                  Enrolled on: {formatDateTime(row.enrollment_date)}
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 pt-1">
            {renderMobileCard ? (
              renderMobileCard(row)
            ) : (
              <StatusPill status={row.role} />
            )}
          </div>

          {/* <div className="shrink-0 pt-0.5">
            <StatusPill status={row.role} />
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default CardView;
