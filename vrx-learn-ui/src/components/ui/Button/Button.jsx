import { Icon } from "@/components/ui"

function Button({
  buttonName,
  bgClass = 'bg-[var(--color-primary)]',
  textClass = 'text-white',
  onClick,
  disabled = false,
  type = 'button',
  className,
  frontIconName,
  backIconName,
  frontIconWidth,
  frontIconHeight,
  backIconWidth,
  backIconHeight,
}) {
  const isWhiteBg =
    bgClass.includes('bg-white') ||
    bgClass.includes('bg-[#fff]') ||
    bgClass.includes('bg-[#ffffff]');

  const isIconOnly =
    frontIconName &&
    !buttonName &&
    !backIconName;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
      flex items-center cursor-pointer justify-center
      ${isIconOnly ? "" : "gap-2"}
      ${isIconOnly ? "p-0.5" : ""}
      ${className}
      transition-all duration-200
      ${bgClass} ${textClass}
      ${isWhiteBg ? "border border-primary" : "border-none"}
      ${disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90 active:scale-[0.98]"
        }
    `}
    >
      {frontIconName && (
        <Icon
          height={frontIconHeight}
          width={frontIconWidth}
          name={frontIconName}
        />
      )}

      {buttonName && <span>{buttonName}</span>}

      {backIconName && (
        <Icon
          width={backIconWidth}
          height={backIconHeight}
          name={backIconName}
        />
      )}
    </button>
  );
}

export default Button;
