import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import getPagination from '@/utils/getPagination';
function DataTable({ columns, data, page, setPage, pageSize, total, setPageSize, selectedRows }) {

  const totalPages = Math.ceil(total / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = data.slice(startIndex, endIndex);

  const start = startIndex + 1;
  const end = Math.min(endIndex, total);

  const pages = getPagination(page, totalPages);

  return (
    <div className="w-full h-dvh border-2 border-default flex justify-between flex-col">

      <table className="w-full table-fixed border-b border-default">
        <TableHeader columns={columns} />
        <TableBody selectedRows={selectedRows} columns={columns} data={paginatedData} />
      </table>


      <div className="border-t border-default">
        <TablePagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          total={total}
          setPageSize={setPageSize}
          start={start}
          end={end}
          totalPages={totalPages}
          pages={pages}
        />
      </div>

    </div>
  );
}
export default DataTable;