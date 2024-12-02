import { PropsWithChildren } from "react";
import { Order } from "@/types/transaction";
import priceFormater from "@/helpers/priceFormater.helper";

type Props = {
  orders: Order[];
  onClear?: () => void;
};

const OrderModal = ({ orders, onClear, children }: PropsWithChildren<Props>) => {
  return (
    <>
      <div data-bs-toggle="modal" data-bs-target="#orderModal">
        {children}
      </div>

      <div
        className="modal fade"
        id="orderModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="orderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="orderModalLabel">
                Orders
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="w-100">
                <thead>
                  <tr>
                    <th scope="col" className="w-10">
                      No
                    </th>
                    <th scope="col" className="w-30">
                      Cake
                    </th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length <= 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    orders.map((order, index) => (
                      <tr key={index}>
                        <td>#{index + 1}</td>
                        <td>{order.cakeVariant?.name}</td>
                        <td>{priceFormater(order.price!)}</td>
                        <td>{order.quantity}</td>
                        <td>{priceFormater(order.discount!)}</td>
                        <td>{priceFormater(order.totalPrice!)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {onClear && (
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-outline-primary"
                  onClick={onClear}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal;