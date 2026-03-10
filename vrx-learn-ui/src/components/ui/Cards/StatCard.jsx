import { Icon } from "@/components/ui";

export default function StatCard({
  icon,
  label,
  value
}) {
  return (
    <div className="flex items-center gap-4 p-4 border border-default rounded-xs shadow-sm min-w-56">

      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 text-primary dark:text-white">
        <Icon name={icon} width="36" height="36" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center">
        <p className="text-h4 text-muted">{label}</p>
        <span className="text-h2 font-semibold text-muted">
          {value}
        </span>
      </div>

    </div>
  );
}