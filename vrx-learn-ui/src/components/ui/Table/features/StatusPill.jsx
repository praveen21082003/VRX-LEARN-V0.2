export default function StatusPill({ status='' }) {

  const colors = {
    SUBMITTED: "bg-[#D1E7DD] text-[#0F5132]",
    GRADED: "bg-[#FEEBC8] text-[#7C2D12]",
    DONE_LATE: "bg-[#F8D7DA] text-[#842029]",
    ADMIN: "bg-[#F3E8FF] text-[#3730A3]",
    SUB_ADMIN: "bg-[#E0F2FE] text-[#0369A1]",
    TRAINER:"bg-[#FFEDD5] text-[#C2410C]",
    TRAINEE:"bg-[#D1E7DD] text-[#0F5132]",
    ACTIVE:"bg-[#D1E7DD] text-[#0F5132]",
    INACTIVE:"bg-[#F8D7DA] text-[#840227]",
    PENDING:"bg-[#FEEBC8] text-[#744210]",
  };

  return (
    <div className="leading-none"> 
      <span className={`capitalize px-2 py-0.5 rounded-xs text-small ${colors[status] || "bg-gray-200 text-gray-700"}`}>
        {status.toLowerCase().replace(/_/g, " ")}
      </span>
    </div>
  );
}