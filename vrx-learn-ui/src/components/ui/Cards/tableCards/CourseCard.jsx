import React from "react";
import {Icon} from '@/components/ui'

function CourseCard({ row, columns }) {
  const getCol = (key) => columns.find((c) => c.key === key);

  return (
    <div className="relative p-3 mt-2 border border-default rounded-lg bg-white shadow-sm">


      <div className="absolute top-3 right-3">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
          {row.students} Trainees
        </span>
      </div>


      <div className="absolute bottom-3 right-3 flex gap-2">
        {getCol("actions")?.render?.(row)}
      </div>


      <div className="flex flex-col gap-1 pr-20">

        {/* Title */}
        <p className="text-h5 text-main truncate">
          {row.title}
        </p>

        {/* Trainers */}
        <p className="text-emphasis text-main flex items-center gap-1">
          <Icon name="mdi:users" height="16" width="16" />
          Trainer: {getCol("trainers")?.render?.(row)}
        </p>

        {/* Description */}
        <p className="text-caption text-muted line-clamp-2">
          {row.description}
        </p>

        {/* Created Date */}
        <p className="text-caption text-muted mt-1">
          Created At: {getCol("created_at")?.render?.(row)}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;