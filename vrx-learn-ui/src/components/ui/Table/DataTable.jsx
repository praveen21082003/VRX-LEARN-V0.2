import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";

function DataTable({ columns, data, page, setPage }) {
  return (
    <div className="w-full h-lvh border-2 border-default">
      <table className="w-full border-b-2 border-default">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
      </table>

      <TablePagination />
    </div>
  );
}

export default DataTable;