import {Icon} from "@/components/ui"

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

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-3
        ${className}
        transition-all duration-200
        ${bgClass} ${textClass}
        ${isWhiteBg ? 'border border-primary' : 'border-none'}
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:opacity-90 active:scale-[0.98]'
        }
      `}
    >
      <Icon height={frontIconHeight} width={frontIconWidth} name={frontIconName}/>{buttonName}<Icon width={backIconWidth} height={backIconHeight} name={backIconName}/>
    </button>
  );
}

export default Button;
