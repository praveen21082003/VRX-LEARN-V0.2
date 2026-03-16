import { useState } from "react";
import { Icon } from "@/components/ui";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function FilterSelect({
  inputLabel,
  label,
  options,
  borderClass = "border-default"
}) {
  const [selected, setSelected] = useState(options[0]);
  // const [open, setOpen] = useState(false);
  const [open, ref, setOpen, toggle] = useClickOutside(false);


  return (
    <div className="relative"  ref={ref}>
      {inputLabel &&
        <label className="block text-h5 mb-2 text-main dark:text-white">
          {inputLabel}
        </label>
      }

      <div
        className={`flex items-center ${borderClass ? "border" : "border-2"} ${borderClass} rounded px-3 py-2 gap-2 min-w-40 cursor-pointer`}
        onClick={toggle}
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