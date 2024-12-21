
import { Outlet } from "react-router-dom";
import Input from "@/components/Input";
import handleInput from "@/helpers/input.helper";
import Button from "@/components/Button";
import { Add, Filter, Minus } from "iconsax-react";
import priceFormater from "@/helpers/priceFormater.helper";
import OrderStore from "@/store/OrderStore";
import { useEffect, useState } from "react";
import { Order } from "@/types/transaction.type";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import useFormTransaction from "./hooks/useFormTransaction";
import { getCakes } from "@/service/api/cake.api";

type Grouped = {
  cakeId: number;
  cakeName: string;
  orders: Order[];
  price: number;
  totalDiscount: number;
  discount: number;
  quantity: number;
}

const TransactionForm = () => {
  const { transaction, filters, setCakes, setFilters, clearFilters } = OrderStore();
  const [grouped, setGrouped] = useState<Grouped[]>([]);
  const {
    handleFetchCake,
    handleProcess, tax,
    handleOrderChange } = useFormTransaction();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
      getCakes(0, {
          ...filters,
          isSell: "1",

      }).then((res) => {
          setCakes(res.result);
      });
  }, []);

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFetchCake();
  };

  useEffect(() => {
    const groupedOrders: Grouped[] = [];

    transaction.orders.forEach((order) => {
      const found = groupedOrders.find((group) => group.cakeId === order.cakeVariant?.cakeId);

      if (found) {
        const orderExist = found.orders.find((item) => item.cakeVariantId === order.cakeVariantId);

        if (orderExist) {
          orderExist.quantity = order.quantity || 0;
        } else {
          found.orders.push(order);
        }

        found.price += order.price || 0;
        found.totalDiscount += order.cakeVariant?.cake?.totalDiscount || 0;
        found.quantity += order.quantity || 0;
      } else {
        groupedOrders.push({
          cakeId: order.cakeVariant?.cakeId || 0,
          cakeName: order.cakeVariant?.cake?.name || "",
          orders: [order],
          price: order.price || 0,
          totalDiscount: order.cakeVariant?.cake?.totalDiscount || 0,
          discount: order.cakeVariant?.cake?.totalDiscount || 0,
          quantity: order.quantity || 0,
        });
      }
    });

    setGrouped(groupedOrders);
  }, [transaction]);

  return (
    <section className="position-relative h-100">
      <div className="d-flex p-4 gap-3 h-100">
        <div className="w-70">
          <section id="filter" className="flex-between mb-2">
            <form onSubmit={handleFilter} className="d-flex gap-2 w-80">
              <div className="hstack gap-2 w-100">
                <Input
                  placeholder="Search"
                  name="search"
                  value={filters.search}
                  onChange={(e) => handleInput(e, setFilters, filters)}
                  type="text"
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
              </div>
              <Button type="submit">Search</Button>
              <Button
                type="button"
                isOutline onClick={() => clearFilters()}>Reset</Button>
            </form>
            <Button
              type="button"
              className="position-relative"
              onClick={() => setShowModal(true)}
            >
              <span className="badge rounded-pill bg-danger position-absolute top-0 end-50 translate-middle">
                {Object.values(filters).filter((value) => value !== "").length}
              </span>
              <Filter variant="Bulk" />
            </Button>
          </section>
          <div className="w-100 h-100 overflow-auto no-scrollbar">
            <Outlet />
          </div>
        </div>

        <div className="w-30">
          <div className="card-secondary">
            <h3 className="mb-3">Orders</h3>
            {grouped.length > 0 && (
              <div className="border-top-dashed vstack gap-3 py-3">
                {grouped.map((group, index) => (
                  <div key={index}>
                    <p className="fw-bold no-spacing">{group.cakeName}</p>
                    {group.orders.map((order, index) => (
                      <div key={index} className="ms-2">
                        <div className="flex-between">
                          <p className="text-muted no-spacing">{order.cakeVariant?.name}</p>
                          <div className="hstack gap-2">
                            <Button size="sm" onClick={() => handleOrderChange(order.cakeVariant!, -1)}>
                              <Minus />
                            </Button>
                            <p className="text-muted no-spacing">{order.quantity}</p>
                            <Button size="sm" onClick={() => handleOrderChange(order.cakeVariant!, 1)}>
                              <Add />
                            </Button>

                          </div>
                        </div>
                        {order.cakeVariant?.cake?.totalDiscount !== 0 ? (
                          <div className="hstack gap-2">
                            <p className="no-spacing text-decoration-line-through text-primary">
                              {priceFormater(order.totalPrice || 0)}
                            </p>
                            <p className="text-muted fw-semibold no-spacing">
                              {priceFormater((order.totalPrice || 0) - ((order.cakeVariant?.cake?.totalDiscount || 0) * order.quantity))}
                            </p>
                          </div>
                        ) : (
                          <p className="text-muted fw-semibold no-spacing">
                            {priceFormater(order.totalPrice || 0)}
                          </p>
                        )}
                      </div>
                    ))}
                    {group.discount > 0 && (
                      <div className="flex-between">
                        <p className="text-muted no-spacing">Discount</p>
                        <p className="text-muted no-spacing">- {priceFormater(group.discount)} x {group.quantity}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="border-top-dashed py-3">
              <div className="flex-between">
                <p className="fw-bold">Subtotal</p>
                <p className="fw-semibold">{priceFormater(transaction.orderPrice)}</p>
              </div>
              <div className="flex-between text-muted">
                <p className="no-spacing">Total Discount</p>
                <p className="no-spacing">{priceFormater(transaction.totalDiscount)}</p>
              </div>
              <div className="flex-between text-muted">
                <p className="no-spacing">Tax {tax}%</p>
                <p className="no-spacing">{priceFormater(transaction.tax)}</p>
              </div>
              <div className="flex-between mt-2">
                <p className="fw-bold">Total</p>
                <p className="fw-semibold">{priceFormater(transaction.totalPrice)}</p>
              </div>
            </div>

            <Button className="w-100" onClick={() => handleProcess()}>Process</Button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title="Cake Filter">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleFetchCake();
          setShowModal(false);
        }}>
          <div className="hstack gap-1 mb-2">
            <Select
              placeholder="Order By"
              name="orderBy"
              onChange={(e) => handleInput(e, setFilters, filters)}
              value={filters.orderBy}
              options={[
                { name: "Name", value: "name" },
                { name: "COGS", value: "COGS" },
                { name: "Selling Price", value: "sellingPrice" },
                { name: "Stock Sell", value: "stockSell" },
                { name: "Stock Non Sell", value: "stockNonSell" },
                { name: "Created At", value: "createdAt" },
              ]}
            />
            <Select
              placeholder="Order Type"
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
              placeholder="0"
              name="fromCOGS"
              label="From COGS"
              value={filters.fromCOGS}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="1.000.000"
              name="toCOGS"
              label="To COGS"
              value={filters.toCOGS}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
          </div>
          <div className="flex-between gap-1 mb-2">
            <Input
              placeholder="0"
              name="fromSellingPrice"
              label="From Selling Price"
              value={filters.fromSellingPrice}
              onChange={(e) => handleInput(e, setFilters, filters)}
              type="number"
            />
            <Input
              placeholder="1.000.000"
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
              name="toStockNonSell"
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
              onClick={() => clearFilters()}
              className="w-40">Clear Filter</Button>
          </div>
        </form>
      </Modal>
    </section >
  );
};

export default TransactionForm;
