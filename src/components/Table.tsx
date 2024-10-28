import { Edit, SearchStatus, Trash } from "iconsax-react";
import TablePagination from "./TablePagination";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string) => {
  //return data from column path
  //if path is 'probability.name' then return obj.probability.name
  return (
    obj[path] || path.split(".").reduce((acc, key) => acc && acc[key], obj)
  );
};

type TableProps<T> = {
  data: T[];
  columns: { key: string; title: string }[];
  onDelete?: (item: T) => void;
  onEdit?: (item: T) => void;
  limit: number;
  onSearch: (value: string) => void;
};

const Table = <T,>({
  data,
  columns,
  limit,
  onDelete,
  onEdit,
  onSearch,
}: TableProps<T>) => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [upper, setUpper] = useState(limit);
  const [search, setSearch] = useState("");

  const handleChangePage = (page: number) => {
    setSkip((page - 1) * limit);
    setPage(page);
    setUpper(page * limit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <div className="p-3 p-3 bg-secondary rounded-4">
      <div className="d-flex gap-3 align-items-center w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={handleInputChange}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr className="text-uppercase">
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(skip, upper).map((item, index) => (
              <tr key={index}>
                {columns.map((column, idx) => (
                  <td key={idx}>{String(getNestedValue(item, column.key))}</td>
                ))}
                <td className="">
                  {onEdit && (
                    <button
                      type="button"
                      className="btn btn-sm text-muted"
                      onClick={() => onEdit(item)}
                    >
                      <Edit size="24" variant="Bulk" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      className="btn btn-sm text-danger"
                      onClick={() => onDelete(item)}
                    >
                      <Trash size="24" variant="Bulk" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        total={data.length}
        limit={limit}
        page={page}
        setPage={handleChangePage}
      />
    </div>
  );
};

export default Table;
