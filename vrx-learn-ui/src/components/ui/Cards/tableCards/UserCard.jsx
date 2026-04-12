import React from "react";

function UserCardLayout({ row, columns }) {
  const getCol = (key) => columns.find((c) => c.key === key);

  return (
    <div className="relative p-3 mt-2 border border-default rounded-sm shadow-sm">

      <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end">
        {getCol("role")?.render?.(row)}
        {getCol("status")?.render?.(row)}
      </div>

      <div className="absolute bottom-3 right-3 flex gap-2">
        {getCol("actions")?.render?.(row)}
      </div>

      {/* LEFT CONTENT */}
      <div className="flex items-center gap-3 pr-20">

        <div className="shrink-0">
          {getCol("profile")?.render?.(row)}
        </div>

        <div className="flex flex-col min-w-0 overflow-hidden">

          <div className="text-h5 text-main truncate">
            {getCol("name")?.render
              ? getCol("name").render(row)
              : row.name}
          </div>


          <div className="text-caption text-main truncate">
            {row.email}
          </div>

          <div className="text-caption text-muted mt-1">
            Created at: {getCol("date")?.render?.(row)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCardLayout;