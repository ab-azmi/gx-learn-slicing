import { Edit, Filter, Trash } from "iconsax-react";
import TablePagination from "./TablePagination";
import { useState } from "react";
import Select from "./Select";
import {formatDate} from "@/helpers/dateFormater.helper";
import Input from "./Input";
import DatePicker from "./DatePicker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string) => {
  //return data from column path
  //if path is 'probability.name' then return obj.probability.name
  return (
    obj[path] || path.split(".").reduce((acc, key) => acc && acc[key], obj)
  );
};

type TableFilter = {
  options: Array<{ value: number; name: string; created_at?: string }>;
  name: string;
  onSelect: (name: string, value: string) => void;
};

type TableProps<T> = {
  data: T[];
  columns: { key: string; title: string }[];
  limit: number;
  filter?: TableFilter[];
  onAdd?: () => void;
  onDelete?: (item: T) => void;
  onEdit?: (item: T) => void;
  onSearch: (value: string) => void;
  onClearFilter: () => void;
};

const Table = <T,>({
  data,
  columns,
  limit,
  filter,
  onDelete,
  onEdit,
  onSearch,
  onClearFilter,
  onAdd,
}: TableProps<T>) => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [upper, setUpper] = useState(limit);
  const [search, setSearch] = useState("");

  //make states key-value pair array with length TableFilter length
  const [filterValue, setFilterValue] = useState<
    { key: number; value: number }[]
  >(Array.from({ length: filter?.length || 0 }, () => ({ key: 0, value: -1 })));

  const handleChangePage = (page: number) => {
    setSkip((page - 1) * limit);
    setPage(page);
    setUpper(page * limit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fil = filter?.find((f) => f.name === name);
    const idx = filter?.findIndex((f) => f.name === name);
    setFilterValue((prev) => {
      prev[idx!] = { key: idx!, value: Number(value) };
      return [...prev];
    });
    fil?.onSelect(name, value);
  };

  return (
    <div className="p-3 p-3 bg-secondary rounded-4">
      <div className="d-flex gap-3 align-items-end justify-content-between mb-2">
        <h5 className="fw-bold">Leads Table</h5>
        <div>
          {onAdd && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onAdd()}
            >
              Add
            </button>
          )}
        </div>
      </div>
      <div className="d-flex gap-3 align-items-end mb-2">
        <div className="w-30">
          <Input
            type="text"
            name="search"
            label="Search"
            placeholder="Search..."
            value={search}
            onChange={handleInputChange}
          />
        </div>
        {filter && (
          <>
            {filter.map((f, idx) => (
              <Select
                placeholder={f.name}
                options={f.options}
                name={f.name}
                label={f.name}
                onChange={handleFilterChange}
                key={idx}
                value={filterValue[idx].value.toString()}
              />
            ))}
            <DatePicker onChange={() => {}}/>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {}}
            >
              Search
            </button>
            <button className="btn px-0">
              <Filter size="24" />
            </button>
            <button className="btn px-0" onClick={() => onClearFilter()}>
              Clear All
            </button>
          </>
        )}
      </div>
      <div className="table-responsive mt-3">
        <table className="table">
          <thead>
            <tr className="">
              {columns.map((column, index) => (
                <th key={index} className="bg-muted fw-medium">
                  {column.title}
                </th>
              ))}
              <th className="bg-muted"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data?.slice(skip, upper).map((item, index) => (
                <tr key={index}>
                  {columns.map((column, idx) => (
                    <td key={idx}>
                      {/* if key ends with _at */}
                      {column.key.endsWith("_at")
                        ? formatDate(
                            String(getNestedValue(item, column.key)),
                            "dd MMM yyyy"
                          )
                        : String(getNestedValue(item, column.key))}
                    </td>
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
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <TablePagination
          total={data.length}
          limit={limit}
          page={page}
          setPage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default Table;
