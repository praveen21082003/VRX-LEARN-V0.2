import TableSkeleton from "./features/TableSkeleton";

function TableBody({ columns, loading, data, selectedRows, pageSize, emptyRows = 0 }) {


  if (loading) {
    return <TableSkeleton rowCount={pageSize} columns={columns} />;
  }

  return (

    <tbody className="">
      {data.map((row) => (
        <tr
          key={row.id}
          className={`border-b border-default ${selectedRows?.includes(row.id) ? "bg-primary-16" : ""
            }`}
        >
          {columns.map((col) => (
            <td
              key={col.key}
              style={{ width: col.width }}
              className={`p-2 text-body ${col.align === "left" ? "text-left" : "text-center"
                } ${col.className || ""}`}
            >
              {col.render ? col.render(row) : row[col.key]}
            </td>
          ))}
        </tr>
      ))}

      {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
        <tr key={`empty-${index}`} className="h-12 border-b border-transparent">
          {columns.map((col) => (
            <td key={`empty-td-${col.key}`} className="px-4 py-2">&nbsp;</td>
          ))}
        </tr>
      ))}
    </tbody>

  );
}

export default TableBody;