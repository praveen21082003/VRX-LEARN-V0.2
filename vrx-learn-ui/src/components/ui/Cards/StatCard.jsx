import { Icon } from "@/components/ui";

export default function StatCard({
  icon,
  label,
  value
}) {
  return (
    <div className="flex items-center justify-center gap-3 p-3 sm:p-4 border border-default rounded-xs shadow-sm w-full overflow-hidden">

      {/* Icon */}
      <div className="flex  w-10 h-10 text-primary dark:text-white shrink-0">
        <Icon name={icon} width="36" height="36" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-h4 sm:text-h4 text-muted text-center break-words">{label}</p>
        <span className="text-xl sm:text-h2 font-semibold text-primary text-center ">
          {value}
        </span>
      </div>

    </div>
  );
}