import { Edit, Filter, Trash } from "iconsax-react";
import { useState } from "react";
import { Paginate } from "@/types/wraper";
import { useNavigate } from "react-router-dom";
import { Cake } from "@/types/transaction";
import { transactionPath } from "@/path/transaction.path";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import ModalConfirm from "@/components/ModalConfirm";
import TablePagination from "@/components/TablePagination";
import priceFormater from "@/helpers/priceFormater.helper";
import { cakePath } from "@/path/cakes.path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string): any => {
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
  data?: Paginate<Cake>;
  columns: number;
  filter?: TableFilter[];
  loading?: boolean;
  onDelete?: (item: Cake) => void;
  onSearch: (value: string) => void;
  onClearFilter: () => void;
  onFilter: () => void;
  onChangePage: (page?: number) => void;
};

const TableCake = ({
  data,
  columns,
  filter,
  loading,
  onDelete,
  onSearch,
  onClearFilter,
  onFilter,
  onChangePage,
}: TableProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  //make states key-value pair array with length TableFilter length
  const [filterValue, setFilterValue] = useState<
    { key: number; value: number }[]
  >(Array.from({ length: filter?.length || 0 }, () => ({ key: 0, value: -1 })));

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

  const handleClearFilter = () => {
    onClearFilter();
    setSearch("");
    setFilterValue((prev) =>
      prev.map((f) => {
        return { key: f.key, value: -1 };
      })
    );
  };

  return (
    <div className="p-3 p-3 bg-secondary rounded-2">
      {/* DONE : Responsive Table & Filters */}
      <div className="d-flex gap-3 align-items-end justify-content-between mb-4">
        <h4 className="fw-bold">Manage Transaction</h4>
        <div className="d-flex align-items-center gap-2">
          <Button isOutline>Generate Summary</Button>

          <Button
            type="button"
            style="fill"
            onClick={() => navigate(cakePath.form)}
          >
            Add
          </Button>
        </div>
      </div>

      {/* DONE : Wrap Filters input with Form tag for accesibility */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFilter();
        }}
        className="d-flex gap-3 align-items-end mb-3 flex-wrap"
      >
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
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Search"}
            </button>
            <button className="btn px-0">
              <Filter size="24" />
            </button>
            <button
              type="button"
              className="btn px-0 text-decoration-underline"
              onClick={() => handleClearFilter()}
            >
              Clear All
            </button>
          </>
        )}
      </form>

      <ul className="nav custom-tab mb-3" id="pills-tab" role="tablist">
        <li className="nav-item tab-item" role="presentation">
          <button
            className="tab-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            All Leads
          </button>
        </li>
        <li className="nav-item tab-item" role="presentation">
          <button
            className="tab-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            From MyGX App
          </button>
        </li>
        <li className="tab-item flex-grow-1">
          <button className="tab-link h-100 w-100"></button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active py-2"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {/* DONE : NO repetitive class */}
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Variant</th>
                  <th>Profit Margin</th>
                  <th>Sell Price</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.result?.length ? (
                  data?.result.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {/* DONE : Reusable style */}
                        <div className="mt-3">
                          <p className="text-capitalize">
                            {item['name']}
                          </p>
                        </div>
                      </td>
                      <td className="px-3">
                        <div>
                          <p className="text-muted">{item['stock']}</p>
                        </div>
                      </td>
                      <td>
                       <div className="d-flex flex-column gap-1">
                          <span className="text-uppercase fw-semibold text-decoration-underline text-success">
                            #{getNestedValue(item, 'variant.name')}
                          </span>
                        </div>
                        <span className="badge fs-6 text-capitalize fw-normal bg-primary mt-2">
                          Show Ingridients
                        </span>
                      </td>

                      <td>
                      <div>
                          <b className="text-capitalize fw-medium">
                            {item["profitMargin"] ? item["profitMargin"] : "default"}
                          </b>
                        </div>
                      </td>

                      <td className="px-3">
                        <div>
                          <b className="text-capitalize fw-medium">
                            {priceFormater(item["sellPrice"])}
                          </b>
                        </div>
                      </td>

                      <td>
                        <Button type="button" style="fill">
                          Report
                        </Button>
                        <div className="d-flex gap-1 mt-3">
                          <button
                            type="button"
                            className="btn btn-sm text-muted"
                            onClick={() =>
                              navigate(transactionPath.form, { state: item })
                            }
                          >
                            <Edit size="24" variant="Bulk" />
                          </button>

                          {onDelete && (
                            <ModalConfirm
                              title="Delete Confirm"
                              message="This cannot be undone!"
                              show
                              onConfirm={() => onDelete(item)}
                            >
                              <button
                                type="button"
                                className="btn btn-sm text-danger"
                              >
                                <Trash size="24" variant="Bulk" />
                              </button>
                            </ModalConfirm>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // DONE : Show loading here too
                  <tr>
                    <td colSpan={columns + 1} className="text-center">
                      {loading ? "Loading..." : " No data available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-2">
            {data?.result?.length && (
              <TablePagination
                total={data.pagination?.count || 0}
                limit={data.pagination?.perPage || 0}
                page={data.pagination?.currentPage || 0}
                setPage={(page) => onChangePage(page)}
              />
            )}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          suscipit odio quam officia tempora ducimus deserunt debitis laborum
          dignissimos temporibus?
        </div>
      </div>
    </div>
  );
};

export default TableCake;
