function TableBody({ columns, data }) {
  return (
    <tbody className="flex-1 overflow-y-auto">
      {data.map((row) => (
        <tr key={row.id} className="border-b border-default">
          {columns.map((col) => (
            <td key={col.key}
              className={`p-2 text-h5 ${col.align === "left" ? "text-left" : "text-center"
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