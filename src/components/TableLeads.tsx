import { Edit, Filter, Trash } from "iconsax-react";
import TablePagination from "./TablePagination";
import { useState } from "react";
import Select from "./Select";
import formatDate from "@/helpers/dateFormater.helper";
import Input from "./Input";
import DatePicker from "./DatePicker";
import { Lead } from "@/types/leads";
import User from "@/assets/images/user.jpg";
import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string) => {
  //return data from column path
  //if path is 'probability.name' then return obj.probability.name
  return (
    obj[path] || path.split(".").reduce((acc, key) => acc && acc[key], obj)
  );
};

type TableFilter = {
  options: Array<{ id: number; name: string; created_at?: string }>;
  name: string;
  onSelect: (name: string, value: string) => void;
};

type TableProps = {
  data: Lead[];
  columns: { key: string; title: string }[];
  limit: number;
  filter?: TableFilter[];
  onAdd?: () => void;
  onDelete?: (item: Lead) => void;
  onEdit?: (item: Lead) => void;
  onSearch: (value: string) => void;
  onClearFilter: () => void;
};

const TableLeads = ({
  data,
  columns,
  limit,
  filter,
  onDelete,
  onEdit,
  onSearch,
  onClearFilter,
  onAdd,
}: TableProps) => {
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
        <h5 className="fw-bold">Manage Leads</h5>
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
            <DatePicker />
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
              <th className="bg-muted w-20 fw-medium"># Leads</th>
              <th className="bg-muted w-20 fw-medium">Address</th>
              <th className="bg-muted w-20 fw-medium">Status</th>
              <th className="bg-muted w-20 fw-medium">Info</th>
              <th className="bg-muted w-20 fw-medium">Created</th>
              <th className="bg-muted"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data?.slice(skip, upper).map((item, index) => (
                <tr key={index}>
                  <td>
                    <span className="text-primary">
                      #{getNestedValue(item, "code")}
                    </span>
                    <div className="d-flex flex-column gap-1 mt-3">
                      <span className="text-muted text-xs">Branch Office</span>
                      <span className="text-capitalize">
                        Globalxtreme {getNestedValue(item, "branch")}
                      </span>
                    </div>
                  </td>
                  <td className="px-3">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-capitalize fw-medium">
                        {getNestedValue(item, "branch")}
                      </span>
                      <span className="text-muted">
                        {getNestedValue(item, "address")}
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-1 mt-3">
                      <span className="text-capitalize fw-medium">Phone</span>
                      <span className="text-muted">
                        {getNestedValue(item, "phone")}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge fs-6 bg-info text-capitalize fw-medium">
                      {getNestedValue(item, "status.name")}
                    </span>
                    <div className="d-flex flex-column gap-1 mt-3">
                      <span className="text-muted">Probability</span>
                      <span className="text-uppercase fw-semibold text-decoration-underline text-info">
                        #{getNestedValue(item, "probability.name")}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex flex-column gap-1"
                      style={{ width: "fit-content" }}
                    >
                      <span className="text-muted">Type</span>
                      <div className="d-flex gap-1">
                        <span className="badge fs-6 bg-info text-capitalize fw-medium">
                          {getNestedValue(item, "type.name")}
                        </span>
                        <button className="border-0 bg-transparent">
                          <Edit size="20" />
                        </button>
                      </div>
                    </div>
                    <div
                      className="d-flex flex-column gap-1 mt-3"
                      style={{ width: "fit-content" }}
                    >
                      <span className="text-muted">Note</span>
                      <span className="text-capitalize">
                        {getNestedValue(item, "note")}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src={User}
                        alt=""
                        className="rounded-circle object-fit-cover"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div className="text-xs text-capitalize d-flex flex-column">
                        <span className="fw-bold">
                          {getNestedValue(item, "name")}
                        </span>
                        <span className="fw-light">
                          {formatDate(
                            getNestedValue(item, "created_at"),
                            "dd MMM yyyy HH:mm"
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Button type="button" style="fill">
                      Report
                    </Button>
                    <div className="d-flex gap-1 mt-3">
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
                    </div>
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

export default TableLeads;
