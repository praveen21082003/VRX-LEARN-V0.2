// components/ui/BreadcrumbMenu.jsx
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function BreadcrumbMenu({
  items = [
    { label: "My Learning", to: "/dashboard" },
    { label: "" }
  ]
}) {
  return (
    <nav className="flex items-center gap-1 text-sm text-white/90">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1">
            {index !== 0 && (
              <ChevronRight size={14} className="opacity-70" />
            )}

            {isLast ? (
              <span className="font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.to}
                className="hover:underline hover:text-white transition"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
