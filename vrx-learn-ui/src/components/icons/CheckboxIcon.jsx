export default function CheckboxIcon({
  checked = false,
  className = "",
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {checked ? (
        <>
          {/* Filled circle */}
          <circle cx="12" cy="12" r="12" fill="currentColor" />

          {/* Tick */}
          <path
            d="M6 12l4 4 8-8"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          {/* Empty circle */}
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}
