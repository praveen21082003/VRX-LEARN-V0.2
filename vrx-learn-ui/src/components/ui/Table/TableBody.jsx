function TableBody({ columns, data, selectedRows }) {
  return (
    <tbody className="flex-1 overflow-y-auto">
      {data.map((row) => (
        <tr
          key={row.id}
          className={`border-b border-default ${selectedRows?.includes(row.id) ? "bg-primary-16" : ""
            }`}
        >
          {columns.map((col) => (
            <td key={col.key}
              className={`p-2 text-body ${col.align === "left" ? "text-left" : "text-center"
                }`}
            >
              {col.render ? col.render(row) : row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;