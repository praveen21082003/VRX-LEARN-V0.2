import React from "react";

function ProgressBar({ percent = 0 }) {
  const safePercent = Math.min(Math.max(percent, 0), 100);

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="w-full h-2 rounded bg-[#949493] overflow-hidden">
        <div
          className="h-full bg-[#FAFAF8] transition-all duration-300"
          style={{ width: `${safePercent}%` }}
        />
      </div>
      <span className="text-lg font-medium text-white">
        {safePercent}%
      </span>
    </div>
  );
}

export default ProgressBar;

