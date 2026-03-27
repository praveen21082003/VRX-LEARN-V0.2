import React from "react";

function CardView({ data, columns }) {
  return (
    <div className="flex flex-col gap-3 p-2">
      {data.map((row) => (
        <div
          key={row.id}
          className="border border-default rounded-lg p-3 bg-white shadow-sm"
        >
          {columns.map((col) => (
            <div
              key={col.key}
              className="flex justify-between items-center py-1"
            >
              
              <span className="text-xs text-muted">
                {typeof col.label === "string" ? col.label : ""}
              </span>

              <span className="text-sm text-main">
                {col.render ? col.render(row) : row[col.key]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CardView;
