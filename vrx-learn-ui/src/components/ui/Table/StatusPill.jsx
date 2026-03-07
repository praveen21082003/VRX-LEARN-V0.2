export default function StatusPill({ status }) {

  const colors = {
    SUBMITTED: "bg-[#D1E7DD] text-[#0F5132]",
    GRADED: "bg-[#FEEBC8] text-[#7C2D12]",
    DONE_LATE: "bg-[#F8D7DA] text-[#842029]"
  };

  return (
    <div className="text-body">
      <span className={`capitalize px-2 rounded py-px ${colors[status] || "bg-gray-200 text-gray-700"}`}>
        {status.toLowerCase().replace(/_/g, " ")}
      </span>
    </div>
  );
}