import { useNavigate } from "react-router-dom";
import { Icon } from "@/components/ui";

export default function BackButton({
  label = "Back to Course",
  to = -1,
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2 text-sm font-medium text-primary hover:underline cursor-pointer"
    >
      <Icon
        name="material-symbols:arrow-back-rounded"
        width="18px"
        height="18px"
      />
      {label}
    </button>
  );
}
