import React from "react";

function ReorderList({ items = [] }) {
  return (
    <div className="w-full">
      <ul className="flex flex-col gap-3">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="group flex justify-between items-center px-6 py-4 bg-white rounded-xl shadow-sm border transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-medium">
                {index + 1}.
              </span>
              <span className="font-semibold text-gray-800">
                {item.title}
              </span>
            </div>

            <span className="opacity-0 group-hover:opacity-100 transition">
              ⠿
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReorderList;

