import Button from "@/components/Button";
import priceFormater from "@/helpers/priceFormater.helper";
import { Add, Minus, ShoppingCart } from "iconsax-react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import OrderModal from "./components/OrderModal";
import useFormTransaction from "./hooks/useFormTransaction";
import handleInput from "@/helpers/input.helper";

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

  const cakesOptions = cakes?.map((cake) => ({
    name: cake.name,
    value: cake.id!,
  }));

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchVariants();
  }

  return (
    <div className="h-100 p-4 position-relative">
      <h3 className="mt-3">Transaction</h3>

      <div className="d-flex gap-3 justify-content-between flex-wrap">
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
        <OrderModal orders={input.orders} onClear={clearInput}>
          <Button type="button" className="position-relative">
            <span className="badge rounded-pill bg-danger position-absolute top-0 end-50 translate-middle">
              {input.orders?.length}
            </span>
            <ShoppingCart variant="Outline" />
          </Button>
        </OrderModal>
      </div>

      <div className="row">
        {cakeVariants?.map((variant) => (
          <div key={variant.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="bg-secondary mt-3 rounded-2 p-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <h4>{variant.name}</h4>
                <p className="m-0 p-0">
                  {priceFormater(variant.cake?.sellingPrice || 0)}
                </p>
                <p className="text-xs m-0 p-0">
                  + {priceFormater(variant.price || 0)}
                </p>
              </div>
              <div className="d-flex gap-2 justify-content-between align-items-center">
                <span>
                  Stock : {variant.cake?.stock}
                </span>
                <div className="d-flex gap-2 align-items-center">
                  {input.orders?.find(
                    (order) => order.cakeVariantId === variant.id
                  )?.quantity && (
                      <>
                        <Button
                          disabled={variant.cake?.stock === 0}
                          size="sm"
                          onClick={() => handleOrderChange(variant, -1)}>
                          <Minus />
                        </Button>
                        <h6>
                          {input.orders?.find(
                            (order) => order.cakeVariantId === variant.id
                          )?.quantity}
                        </h6>
                      </>
                    )}
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

      <div className="shadow-lg bg-secondary mt-3 rounded-2 p-3 d-flex justify-content-between align-items-center sticky-bottom">
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

      <div className="modal fade"
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
                  <div className="d-flex justify-content-between">
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
                        <td>Total Price</td>
                        <td>{priceFormater(receipt.totalPrice!)}</td>
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
      </div>
    </div>
  );
};

export default Form;
