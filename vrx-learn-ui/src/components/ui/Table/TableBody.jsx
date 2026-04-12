import TableSkeleton from "./features/TableSkeleton";

function TableBody({ columns, loading, data, selectedRows, pageSize, emptyRows = 0 }) {


  if (loading) {
    return <TableSkeleton rowCount={pageSize} columns={columns} />;
  }

  return (

    <tbody className="">
      {Array.isArray(data) && data?.length > 0 ? (
        data.map((row,index) => (
          <tr
            key={row.id || index}
            className={`border-b border-default ${selectedRows?.includes(row.id) ? "bg-primary-16" : ""
              }`}
          >
            {columns.map((col, index) => (
              <td
                key={col.key || index}
                style={{ width: col.width }}
                className={`p-2 text-body ${col.align === "left" ? "text-left" : "text-center"
                  } ${col.className || ""}`}
              >
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length}>
            <div className="flex flex-col items-center justify-center py-10 text-muted">
              <span className="text-sm font-medium">No records found</span>
              <p className="text-xs mt-1">
                Try adjusting filters or add new data
              </p>
            </div>
          </td>
        </tr>
      )}

      {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
        <tr key={`empty-${index}`} className="h-12 border-b border-transparent">
          {columns.map((col,index) => (
            <td key={`empty-td-${col.key || index}`} className="px-4 py-2">&nbsp;</td>
          ))}
        </tr>
      ))}
    </tbody>

  );
}

export default TableBody;