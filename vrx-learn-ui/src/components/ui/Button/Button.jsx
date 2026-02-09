function Button({
  buttonName,
  bgClass = 'bg-[var(--color-primary)]',
  textClass = 'text-white',
  onClick,
  disabled = false,
}) {
  const isWhiteBg =
    bgClass.includes('bg-white') ||
    bgClass.includes('bg-[#fff]') ||
    bgClass.includes('bg-[#ffffff]');

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2.5
        w-full rounded-lg p-3 font-semibold text-sm
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
      {buttonName}
    </button>
  );
}

export default Button;
