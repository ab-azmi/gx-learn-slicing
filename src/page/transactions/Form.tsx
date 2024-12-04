import Button from "@/components/Button";
import priceFormater from "@/helpers/priceFormater.helper";
import { Add, Minus, ShoppingCart } from "iconsax-react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import useFormTransaction from "./hooks/useFormTransaction";
import handleInput from "@/helpers/input.helper";
import ModalTable from "@/components/ModalTable";
import createColumn from "@/helpers/tableColumn.helper";
import { useState } from "react";

const Form = () => {
  const {
    cakes,
    input,
    receipt,
    filters,
    setFilters,
    clearInput,
    cakeVariants,
    clearFilter,
    fetchVariants,
    handleProcess,
    handleOrderChange
  } = useFormTransaction();

  const [showCart, setShowCart] = useState(false);

  const cakesOptions = cakes?.map((cake) => ({
    name: cake.name,
    value: cake.id!,
  }));

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchVariants();
  }

  const orderColumns = [
    createColumn('cakeVariant.name', 'Name'),
    createColumn('price', 'Price', 'price'),
    createColumn('quantity', 'Quantity'),
    createColumn('totalPrice', 'Total Price', 'price'),
  ];

  const getQuantity = (variantId: number) => input.orders?.find(
    (order) => order.cakeVariantId === variantId
  )?.quantity;

  return (
    <div className="h-100 p-4 position-relative">
      <h3 className="mt-3">Transaction</h3>

      <section id="filter" className="flex-between gap-3 flex-wrap">
        <form onSubmit={handleFilter} className="d-flex gap-3 flex-wrap">
          <Input
            placeholder="Search"
            name="search"
            value={filters.search}
            onChange={(e) => handleInput(e, setFilters, filters)}
            type="text"
          />
          <Select
            placeholder="Cake"
            name="cakeId"
            value={filters.cakeId}
            onChange={(e) => handleInput(e, setFilters, filters)}
            options={cakesOptions}
          />
          <Select
            placeholder="Order By"
            name="orderBy"
            value={filters.orderBy}
            onChange={(e) => handleInput(e, setFilters, filters)}
            options={[
              { name: "name", value: 'name' },
              { name: "price", value: 'price' },
            ]}
          />
          <Select
            placeholder="Order Type"
            name="orderType"
            value={filters.orderType}
            onChange={(e) => handleInput(e, setFilters, filters)}
            options={[
              { name: "asc", value: 'asc' },
              { name: "desc", value: 'desc' },
            ]}
          />
          <Button type="submit">
            Filter
          </Button>
          <Button type="button" isOutline onClick={clearFilter}>
            Clear
          </Button>
        </form>
        <Button type="button" className="position-relative" onClick={() => setShowCart(true)}>
          <span className="badge rounded-pill bg-danger position-absolute top-0 end-50 translate-middle">
            {input.orders?.length}
          </span>
          <ShoppingCart variant="Outline" />
        </Button>
      </section>

      <div className="row">
        {cakeVariants?.map((variant) => (
          <div key={variant.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card-secondary h-100">
              <div>
                <h4>{variant.name}</h4>
                <p className="no-spacing">
                  {priceFormater(variant.cake?.sellingPrice || 0)}
                </p>
                <p className="text-xs no-spacing">
                  + {priceFormater(variant.price || 0)}
                </p>
              </div>
              <div className="flex-between gap-4 mt-2">
                <span>
                  Stock : {variant.cake?.stock}
                </span>
                <div className="d-flex gap-2 align-items-center">
                  {getQuantity(variant.id) && getQuantity(variant.id) != 0 ? (
                      <>
                        <Button
                          disabled={variant.cake?.stock === 0}
                          size="sm"
                          onClick={() => handleOrderChange(variant, -1)}>
                          <Minus />
                        </Button>
                        <h6>
                          {getQuantity(variant.id)}
                        </h6>
                      </>
                    ) : null}
                  <Button
                    disabled={variant.cake?.stock === 0}
                    size="sm"
                    onClick={() => handleOrderChange(variant, 1)}>
                    <Add />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shadow-lg card-secondary flex-between sticky-bottom">
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
      </div>

      <section className="modal fade"
        id="receiptModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="receiptModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="receiptModalLabel">
                RECEIPT
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {receipt != null ? (
                <div className="d-flex flex-column gap-3">
                  <div className="flex-between">
                    <p className="m-0 p-0">{receipt.number}</p>
                    <p className="m-0 p-0 text-xs">{receipt.createdAt}</p>
                  </div>
                  <p className="mb-2 p-0">Cashier : {receipt.employee?.name}</p>
                  <table>
                    <thead>
                      <tr>
                        <th className="w-10">No</th>
                        <th>Cake</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receipt.orders.map((order, index) => (
                        <tr key={index}>
                          <td>#{index + 1}</td>
                          <td>{order.cakeVariant?.name}</td>
                          <td>{priceFormater(order.price!)}</td>
                          <td>{order.quantity}</td>
                          <td>{priceFormater(order.discount!)}</td>
                          <td>{priceFormater(order.totalPrice!)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <hr />
                  <table className="align-self-end w-40">
                    <tbody>
                      <tr>
                        <td>Order Price</td>
                        <td>{priceFormater(receipt.orderPrice!)}</td>
                      </tr>
                      <tr>
                        <td>Total Discount</td>
                        <td>{priceFormater(receipt.totalDiscount!)}</td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td>{priceFormater(receipt.tax!)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="align-self-end w-40">
                    <tbody>
                      <tr>
                        <td>

                        </td>
                        <td>
                          <h4>
                            {priceFormater(receipt.totalPrice!)}
                          </h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Loading</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </section>

      <ModalTable 
        show={showCart}
        onClose={() => setShowCart(false)}
        title="Current Orders" 
        columns={orderColumns} 
        data={input.orders} 
        onClear={clearInput}/>
    </div>
  );
};

export default Form;
