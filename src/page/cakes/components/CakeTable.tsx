import { ArchiveBox, Cake, Edit, Filter } from "iconsax-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Paginate } from "@/types/wraper";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ModalConfirm from "@/components/ModalConfirm";
import TablePagination from "@/components/TablePagination";
import priceFormater from "@/helpers/priceFormater.helper";
import cakePath from "@/path/cakes.path";
import handleInput from "@/helpers/input.helper";
import Select from "@/components/Select";
import { CakeFilter, Cake as CakeType } from "@/types/cake.type";
import Modal from "@/components/Modal";
import Switch from "@/components/Switch";
import { getSettings } from "@/service/api/setting.api";
import { getCake } from "@/service/api/cake.api";

type TableProps = {
  data?: Paginate<CakeType>;
  columns: number;
  loading?: boolean;
  filters: CakeFilter;
  setFilters: Dispatch<SetStateAction<CakeFilter>>;
  onDelete?: (id: number) => void;
  onFilter: () => void;
  onClearFilter: () => void;
  onChangePage: (page?: number) => void;
  onSelected?: (cake: CakeType) => void;
  onRestock?: (cake: CakeType) => void;
};

const CakeTable = ({
  data,
  columns,
  loading,
  filters,
  setFilters,
  onFilter,
  onDelete,
  onClearFilter,
  onChangePage,
  onRestock,
  onSelected,
}: TableProps) => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [defaultMargin, setDefaultMargin] = useState<number>(0);
  const selected = useRef<CakeType | null>(null);

  useEffect(() => {
    getSettings({ key: 'profit_margin' }).then((res) => {
      setDefaultMargin(res.result[0].value);
    })
  }, [])

  const selectCake = (id: number) => {
    getCake(id).then((res) => {
      if (onSelected) {
        onSelected(res.result);
      }
    });
  }

  return (
    <div className="card-secondary">
      <section className="flex-between gap-3 mb-4">
        <h4 className="fw-bold">Manage Cakes</h4>
        <Button
          type="button"
          style="fill"
          onClick={() => navigate(cakePath.form)}
        >
          Add
        </Button>
      </section>

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
              { name: "Ingredient", value: "ingredient" },
              { name: "Discount Name", value: "discount" },
            ]}
          />
          <Select
            placeholder="Status"
            name="isSell"
            value={filters.isSell}
            onChange={(e) => handleInput(e, setFilters, filters)}
            options={[
              { name: "Sell", value: "1" },
              { name: "Not Sell", value: "0" },
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
              <th>Name</th>
              <th>Is Sell</th>
              <th>Stock Sell</th>
              <th>Stock Non Sell</th>
              <th>Profit Margin</th>
              <th>Base Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.length ? (
              data?.result.map((item) => (
                <tr key={item.id}>
                  <td>
                    <p className="text-capitalize">
                      {item['name']}
                    </p>
                  </td>
                  <td className="px-3">
                    <div>
                      <Switch checked={item.isSell} onChange={() => { }} />
                    </div>
                  </td>
                  <td className="px-3">
                    <div>
                      <p className="text-muted">{item.stockSell} pcs</p>
                    </div>
                  </td>
                  <td className="px-3">
                    <div>
                      <p className="text-muted">{item.stockNonSell} pcs</p>
                    </div>
                  </td>

                  <td>
                    <div>
                      <b className="text-capitalize fw-medium">
                        {item.profitMargin || defaultMargin} %
                      </b>
                    </div>
                  </td>

                  <td className="px-3">
                    <div>
                      <b className="text-capitalize fw-medium">
                        {priceFormater(item["sellingPrice"])}
                      </b>
                    </div>
                  </td>

                  <td>
                    <div className="hstack gap-1">
                      <Button
                        className="bg-transparent border-0 text-primary"
                        onClick={() => selectCake(item.id!)}
                        size="sm">
                        <Cake size="24" variant="Bulk" />
                      </Button>
                      <Button
                        className="bg-transparent border-0"
                        onClick={() =>
                          navigate(cakePath.form, { state: item })
                        }
                      >
                        <Edit size="24" variant="Bulk" />
                      </Button>
                      <Button
                        className="bg-transparent border-0 text-danger"
                        onClick={() => {
                          selected.current = item;
                          setConfirm(true);
                        }}
                      >
                        <ArchiveBox size="24" variant="Bulk" />
                      </Button>
                      <Button size="sm" onClick={() => {
                        if (onRestock) {
                          onRestock(item);
                        }
                      }}>
                        Restock
                      </Button>
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
        {(data?.result?.length && data?.result?.length > data?.pagination?.perPage) && (
          <TablePagination
            total={data.pagination?.totalPage || 0}
            limit={data.pagination?.perPage || 0}
            page={data.pagination?.currentPage || 0}
            setPage={(page) => onChangePage(page)}
          />
        )}
      </div>

      <ModalConfirm
        show={confirm}
        onClose={() => setConfirm(false)}
        title="Archived Confirm"
        message={`${selected.current?.name} will be archived`}
        onConfirm={() => {
          if (onDelete && selected.current) {
            onDelete(selected.current.id!);
          }
          setConfirm(false);
        }}
      />

      <Modal show={showModal} onClose={() => setShowModal(false)} title="Cake Filter">
        <form onSubmit={(e) => {
          e.preventDefault();
          onFilter();
          setShowModal(false);
        }}>
          <div className="mb-2">
            <Switch label="Is Archived" checked={!!filters.archived} onChange={() =>
              setFilters({ ...filters, archived: filters.archived ? "" : "1" })
            } />
          </div>
          <div className="hstack gap-1 mb-2">
            <Select
              placeholder="Order By"
              label="Order By"
              name="orderBy"
              onChange={(e) => handleInput(e, setFilters, filters)}
              value={filters.orderBy}
              options={[
                { name: "Name", value: "name" },
                { name: "Stock Sell", value: "stockSell" },
                { name: "Stock Non Sell", value: "stockNonSell" },
                { name: "Base Price", value: "sellingPrice" },
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
              name="fromCOGS"
              label="From COGS"
              value={filters.fromCOGS}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="Rp 1.000.000"
              name="toCOGS"
              label="To COGS"
              value={filters.toCOGS}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
          </div>
          <div className="flex-between gap-1 mb-2">
            <Input
              placeholder="Rp 0"
              name="fromSellingPrice"
              label="From Selling Price"
              value={filters.fromSellingPrice}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="Rp 1.000.000"
              name="toSellingPrice"
              label="To Selling Price"
              value={filters.toSellingPrice}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
          </div>
          <div className="flex-between gap-1 mb-2">
            <Input
              placeholder="0"
              name="fromStockSell"
              label="From Stock Sell"
              value={filters.fromStockSell}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="100"
              name="toStockSell"
              label="To Stock Sell"
              value={filters.toStockSell}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
          </div>
          <div className="flex-between gap-1 mb-2">
            <Input
              placeholder="0"
              name="fromStockNonSell"
              label="From Stock Non Sell"
              value={filters.fromStockNonSell}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="100"
              name="toStocNonkSell"
              label="To Stock Non Sell"
              value={filters.toStockNonSell}
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
    </div>
  );
};

export default CakeTable;
