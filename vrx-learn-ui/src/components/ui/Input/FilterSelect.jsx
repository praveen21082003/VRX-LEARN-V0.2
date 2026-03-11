import { useState } from "react";
import { Icon } from "@/components/ui";

export default function FilterSelect({ label, options }) {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      {/* top select UI (unchanged) */}
      <div
        className="flex items-center border-2 border-default rounded px-3 py-2 gap-2 min-w-40 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-body text-muted whitespace-nowrap">
          {label} {selected.label}
        </span>

        <Icon
          name="ep:arrow-down-bold"
          height="12"
          width="12"
          className="text-body ml-auto"
        />
      </div>

      {/* custom dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-background border border-default shadow-md z-20">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="px-3 py-2 text-body hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}