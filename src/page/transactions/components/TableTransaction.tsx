import { Filter, Receipt1 } from "iconsax-react";
import TablePagination from "@/components/TablePagination";
import { Dispatch, SetStateAction, useState } from "react";
import Input from "@/components/Input";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";
import { Paginate } from "@/types/wraper";
import { Transaction, TransactionFilter } from "@/types/transaction.type";
import priceFormater from "@/helpers/priceFormater.helper";
import getNestedValue from "@/helpers/getNestedValue.helper";
import handleInput from "@/helpers/input.helper";
import formatDate from "@/helpers/dateFormater.helper";
import Select from "@/components/Select";
import Modal from "@/components/Modal";
import { getTransaction } from "@/service/api/transaction.api";

type TableProps = {
  data?: Paginate<Transaction>;
  columns: number;
  filters: TransactionFilter;
  setFilters: Dispatch<SetStateAction<{ [key: string]: string; }>>;
  loading?: boolean;
  onDelete?: (item: Transaction) => void;
  onClearFilter: () => void;
  onFilter: () => void;
  onChangePage: (page?: number) => void;
  onSelect: (item: Transaction) => void;
};

const TableTransaction = ({
  data,
  columns,
  filters,
  setFilters,
  loading,
  onFilter,
  onClearFilter,
  onChangePage,
  onSelect
}: TableProps) => {
  const [showModal, setShowModal] = useState(false);

  const selectTransaction = (id: number) => {
    getTransaction(id).then((res) => {
      onSelect(res.result);
    })
  }

  return (
    <section className="card-secondary">
      <div className="flex-between gap-3 mb-4">
        <h4 className="fw-bold">Manage Transaction</h4>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFilter();
        }}
        className="flex-between mb-3"
      >
        <div className="w-70 gap-2 hstack">
          <Input
            type="text"
            name="search"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => handleInput(e, setFilters, filters)}
          />
          <Select
            placeholder="Search In"
            name="searchIn"
            value={filters.searchIn}
            onChange={(e) => handleInput(e, setFilters, filters)}
            options={[
              { name: "Cake Variant", value: "cakeVariant" },
              { name: "Employee", value: "employee" },
              { name: "Code", value: "number" },
            ]}
          />
          <Select
            placeholder="Status"
            name="statusId"
            value={filters.statusId}
            onChange={(e) => handleInput(e, setFilters, filters)}
            options={[
              { name: "Success", value: "1" },
              { name: "Canceled", value: "2" },
            ]}
          />

          <Button onClick={() => onFilter()}>
            Search
          </Button>
          <Button isOutline onClick={() => onClearFilter()}>
            Reset
          </Button>
        </div>

        <Button onClick={() => setShowModal(true)} className="position-relative">
          <span className="badge rounded-pill bg-danger position-absolute top-0 end-50 translate-middle">
            {Object.values(filters).filter((value) => value !== "").length}
          </span>
          <Filter variant="Bulk" />
        </Button>
      </form>

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
                    {item.number}
                  </td>

                  <td>
                    <p className="fw-medium">
                      {priceFormater(item.totalDiscount)}
                    </p>
                    <div className="text-xs">
                      <b className="text-capitalize fw-medium">Tax</b>
                      <p className="text-muted">
                        {priceFormater(item.tax)}
                      </p>
                    </div>
                  </td>

                  <td>
                    <div className="fw-semibold text-primary">
                      {item.quantity}{" "}
                      {item.quantity > 1 ? "cakes" : "cake"}
                    </div>
                  </td>

                  <td>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${getNestedValue(
                          item,
                          "employee.name"
                        )}&background=E195AB&color=1b1b1b`}
                        alt=""
                        className="rounded-circle object-fit-cover"
                        style={{ width: "35px", height: "35px" }}
                      />
                      <div className="text-xs text-capitalize d-flex flex-column">
                        <span className="fw-bold">
                          {getNestedValue(item, "employee.name")}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-3">
                    <div>
                      <b className="text-capitalize fw-medium">
                        {priceFormater(item.totalPrice)}
                      </b>
                    </div>
                  </td>

                  <td>
                    {item.createdAt}
                  </td>

                  <td>
                    <div className="hstack gap-2">
                      <Button type="button" style="fill" size="sm" onClick={() => selectTransaction(item.id!)}>
                        <Receipt1 size="24" variant="Bulk" />
                      </Button>
                      {item.status.name === 'success' ? (
                        <Button type="button" isOutline style="fill" size="sm">
                          Cancel
                        </Button>
                      ) : (
                        <span className="badge rounded-pill bg-danger">
                          Cancelled
                        </span>
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
            total={data.pagination?.totalPage || 0}
            limit={data.pagination?.perPage || 0}
            page={data.pagination?.currentPage || 0}
            setPage={(page) => onChangePage(page)}
          />
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title="Transaction Filter">
        <form onSubmit={(e) => {
          e.preventDefault();
          onFilter();
          setShowModal(false);
        }}>
          <div className="mb-2 w-50">
            <DatePicker
              label="Created At Range"
              onChange={(date) => {
                setFilters({
                  ...filters,
                  fromDate: date[0] ? formatDate(date[0]) : "",
                  toDate: date[1] ? formatDate(date[1]) : "",
                })
              }} />
          </div>
          <div className="hstack gap-1 mb-2">
            <Select
              placeholder="Order By"
              label="Order By"
              name="orderBy"
              onChange={(e) => handleInput(e, setFilters, filters)}
              value={filters.orderBy}
              options={[
                { name: "Quantity", value: "quantity" },
                { name: "Total Price", value: "totalPrice" },
                { name: "Created At", value: "createdAt" },
              ]}
            />
            <Select
              placeholder="Order Type"
              label="Order Type"
              name="orderType"
              onChange={(e) => handleInput(e, setFilters, filters)}
              value={filters.orderType}
              options={[
                { name: "ASC", value: "asc" },
                { name: "DESC", value: "desc" },
              ]}
            />
          </div>
          <div className="flex-between gap-1 mb-2">
            <Input
              placeholder="Rp 0"
              name="fromTotalPrice"
              label="From Total Price"
              value={filters.fromTotalPrice}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="Rp 1.000.000"
              name="toTotalPrice"
              label="To Total Price"
              value={filters.toTotalPrice}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
          </div>
          <div className="flex-between gap-1 mb-2">
            <Input
              placeholder="Rp 0"
              name="fromOrderPrice"
              label="From Order Price"
              value={filters.fromOrderPrice}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="Rp 1.000.000"
              name="toOrderPrice"
              label="To Order Price"
              value={filters.toOrderPrice}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
          </div>
          <div className="flex-between gap-1 mb-2">
            <Input
              placeholder="0"
              name="fromQuantity"
              label="From Quantity"
              value={filters.fromQuantity}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="100"
              name="toQuantity"
              label="To Quantity"
              value={filters.toQuantity}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
          </div>
          <div className="hstack gap-2">
            <Button type="submit" className="w-100">Filter</Button>
            <Button
              type="button"
              isOutline
              onClick={() => onClearFilter()}
              className="w-40">Clear Filter</Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default TableTransaction;
