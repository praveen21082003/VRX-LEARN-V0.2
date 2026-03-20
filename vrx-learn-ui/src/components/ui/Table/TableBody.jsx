import CardView from "./CardView";

function TableBody({ columns, data, selectedRows,renderMobileCard }) {
  return (
    <>
    <tbody className="hidden md:table-row-group flex-1 overflow-y-auto">
      {data.map((row) => (
        <tr
          key={row.id}
          className={`border-b border-default ${selectedRows?.includes(row.id) ? "bg-primary-16" : ""
            }`}
        >
          {columns.map((col) => (
            <td key={col.key}
              className={`p-2 text-body ${col.align === "left" ? "text-left" : "text-center"
                } ${col.className || ""}`}
            >
              {col.render ? col.render(row) : row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    <div className="block md:hidden">
      <CardView data={data}  />
    </div>
    </>   
  );
}

export default TableBody;