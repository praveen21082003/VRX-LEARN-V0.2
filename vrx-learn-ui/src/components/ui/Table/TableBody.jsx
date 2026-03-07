function TableBody({ columns, data }) {
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id} className="border-b border-default">
          {columns.map((col) => (
            <td key={col.key} className="p-2">
              {col.render ? col.render(row) : row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;