
import { Outlet } from "react-router-dom";
import useFormTransaction from "../hooks/useFormTransaction";
import Input from "@/components/Input";
import handleInput from "@/helpers/input.helper";
import Button from "@/components/Button";
import { Filter, Minus } from "iconsax-react";
import priceFormater from "@/helpers/priceFormater.helper";
import OrderStore from "@/store/OrderStore";
import { useEffect, useState } from "react";
import { Order } from "@/types/transaction.type";

type Grouped = {
  cakeId: number;
  cakeName: string;
  orders: Order[];
  price: number;
  totalDiscount: number;
  discount: number;
  quantity: number;
}

const Form = () => {
  const { transaction } = OrderStore();
  const [grouped, setGrouped] = useState<Grouped[]>([]);
  const { filters, setFilters, fetchVariants, handleProcess, tax, handleOrderChange } = useFormTransaction();

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchVariants();
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
            <form onSubmit={handleFilter} className="d-flex gap-3 w-100">
              <div className="w-50">
                <Input
                  placeholder="Search"
                  name="search"
                  value={filters.search}
                  onChange={(e) => handleInput(e, setFilters, filters)}
                  type="text"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
            <Button
              type="button"
              className="position-relative"
              onClick={() => { }}
            >
              <span className="badge rounded-pill bg-danger position-absolute top-0 end-50 translate-middle">
                {Object.values(filters).filter((value) => value !== "").length}
              </span>
              <Filter variant="Outline" />
            </Button>
          </section>
          <div className="w-100 h-100 overflow-auto no-scrollbar">
            <Outlet />
          </div>
        </div>

        <div className="w-30">
          <div className="card-secondary">
            <h1 className="mb-3">Orders</h1>
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
                            <p className="text-muted no-spacing">{order.quantity} pcs</p>
                            <Button size="sm" onClick={() => handleOrderChange(order.cakeVariant!, -1)}>
                              <Minus />
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
      {/* <div className="shadow-lg card-secondary flex-between sticky-bottom">
        <h5 className="fw-semibold">
          Orders :{" "}
          {priceFormater(
            input?.orders?.reduce((acc, item) => acc + item.totalPrice!, 0)
          )}
        </h5>
        <div data-bs-toggle="modal" data-bs-target="#receiptModal">
          <Button type="button" style="fill" onClick={handleProcess}>
            Process
          </Button>
        </div>
      </div> */}
    </section >
  );
};

export default Form;
