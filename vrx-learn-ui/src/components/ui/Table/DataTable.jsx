import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import getPagination from '@/utils/getPagination';
import CardView from './tableCard/CardView'

function DataTable({ columns, data, page, setPage, pageSize, total, setPageSize, selectedRows, renderMobileCard }) {

  const totalPages = Math.ceil(total / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = data.slice(startIndex, endIndex);

  const start = startIndex + 1;
  const end = Math.min(endIndex, total);

  const pages = getPagination(page, totalPages);

  return (
    <div className="w-full h-dvh md:border-2 border-default flex flex-col">


      <div className="hidden md:block">
        <table className="w-full table-fixed border-b border-default">
          <TableHeader columns={columns} />
        </table>
      </div>

      <div className="hidden md:block flex-1 overflow-y-auto">
        <table className="w-full table-fixed">
          <TableBody
            selectedRows={selectedRows}
            columns={columns}
            data={paginatedData}
          />
        </table>
      </div>

  
      <div className="block md:hidden flex-1 overflow-y-auto p-2">
        {renderMobileCard
          ? data.map((row) => renderMobileCard(row))
          : null}
      </div>


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

    </div>);
}
export default DataTable;