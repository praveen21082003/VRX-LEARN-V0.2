function TableHeader({ columns }) {
  return (
    <thead className="bg-table-Header-bg h-14 border-b-2 border-default">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            style={{ width: col.width }}
            className={`p-2 text-h5 ${col.align === "left" ? "text-left" : "text-center"
              }`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;