import { Filter, Trash } from "iconsax-react";
import TablePagination from "@/components/TablePagination";
import { useState } from "react";
import Select from "@/components/Select";
import Input from "@/components/Input";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";
import { Paginate } from "@/types/wraper";
import ModalConfirm from "@/components/ModalConfirm";
import { Order, Transaction } from "@/types/transaction";
import priceFormater from "@/helpers/priceFormater.helper";
import getNestedValue from "@/helpers/getNestedValue.helper";
import OrderModal from "./OrderModal";
import { getTransaction } from "@/service/api/transaction.api";

type TableFilter = {
  options: Array<{ value: number; name: string; created_at?: string }>;
  name: string;
  onSelect: (name: string, value: string) => void;
};

type TableProps = {
  data?: Paginate<Transaction>;
  columns: number;
  filter?: TableFilter[];
  loading?: boolean;
  onDelete?: (item: Transaction) => void;
  onSearch: (value: string) => void;
  onClearFilter: () => void;
  onFilter: () => void;
  onChangePage: (page?: number) => void;
};

const TableTransaction = ({
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
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

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

  const fetchOrders = (item: Transaction) => {
    getTransaction(item.id).then((res) => {
      if(res?.result) {
        setOrders(res.result.orders);
      }
    });
  }

  return (
    <div className="p-3 p-3 bg-secondary rounded-2">
      <div className="d-flex gap-3 align-items-end justify-content-between mb-4">
        <h4 className="fw-bold">Manage Transaction</h4>
        <div className="d-flex align-items-center gap-2">
          <Button isOutline>Generate Summary</Button>
        </div>
      </div>

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
                  <th># Transaction</th>
                  <th>Discount</th>
                  <th>Quantity</th>
                  <th>Cashier</th>
                  <th>Total Price</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.result?.length ? (
                  data?.result.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="mt-3">
                          <p
                            className="text-capitalize text-truncate"
                            style={{ maxWidth: "100px" }}
                          >
                            {item["number"]}
                          </p>
                        </div>
                      </td>

                      <td className="px-3">
                        <div className="mt-3">
                          <p className="fw-medium">
                            {priceFormater(item["totalDiscount"])}
                          </p>
                        </div>
                        <div className="text-xs">
                          <b className="text-capitalize fw-medium">Tax</b>
                          <p className="text-muted">
                            {priceFormater(item["tax"])}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="fw-semibold text-decoration-underline text-success mb-2">
                          {item["quantity"]}{" "}
                          {item["quantity"] > 1 ? "cakes" : "cake"}
                        </div>
                        <OrderModal orders={orders}>
                          <Button
                            type="button"
                            style="fill"
                            size="sm"
                            onClick={() => fetchOrders(item)}
                          >
                            Show Order
                          </Button>
                        </OrderModal>
                      </td>

                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={`https://ui-avatars.com/api/?name=${getNestedValue(
                              item,
                              "employee.name"
                            )}&background=f8c900&color=1b1b1b`}
                            alt=""
                            className="rounded-circle object-fit-cover"
                            style={{ width: "35px", height: "35px" }}
                          />
                          <div className="text-xs text-capitalize d-flex flex-column">
                            <span className="fw-bold">
                              {getNestedValue(item, "employee.name")}
                            </span>
                            <span className="fw-light">
                              {getNestedValue(item, "createdAt")}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-3">
                        <div>
                          <b className="text-capitalize fw-medium">
                            {priceFormater(item["totalPrice"])}
                          </b>
                        </div>
                      </td>

                      <td>
                        <Button type="button" style="fill" size="sm">
                          Receipt
                        </Button>
                        <div className="d-flex gap-1 mt-3">
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

export default TableTransaction;
