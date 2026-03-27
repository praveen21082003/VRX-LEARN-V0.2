
function TableBody({ columns, data, selectedRows, }) {

  return (

    <tbody className="hidden md:table-row-group flex-1 overflow-y-scroll">
      {data.map((row) => (
        <tr
          key={row.id}
          className={`border-b border-default ${selectedRows?.includes(row.id) ? "bg-primary-16" : ""
            }`}
        >
          {columns.map((col) => (
            <td key={col.key}
              style={{ width: col.width }}
              className={`p-2 text-body ${col.align === "left" ? "text-left" : "text-center"
                } ${col.className || ""}`}
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