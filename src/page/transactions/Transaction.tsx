import Modal from "@/components/Modal";
import TableTransaction from "./components/TableTransaction";
import useTransaction from "./hooks/useTransaction";
import { useState } from "react";
import { Transaction as TransactionType } from "@/types/transaction.type";
import Bento from "./components/Bento";
import priceFormater from "@/helpers/priceFormater.helper";

const Transaction = () => {

  const {
    transactions,
    loading,
    handleDelete,
    filters,
    setFilters,
    clearFilter,
    refetchTransaction,
  } = useTransaction();

  const [selected, setSelected] = useState<TransactionType | null>(null);

  return (
    <div className="p-4">
      <Bento />

      <TableTransaction
        data={transactions}
        columns={5}
        onDelete={handleDelete}
        onChangePage={refetchTransaction}
        loading={loading}
        onClearFilter={clearFilter}
        onFilter={refetchTransaction}
        filters={filters}
        setFilters={setFilters}
        onSelect={(item) => setSelected(item)}
      />

      <Modal show={selected !== null} onClose={() => setSelected(null)} title="Transaction Detail">
        <h6 className="text-muted mb-3">{selected?.number}</h6>

        <table className="mb-3 w-50">
          <tbody>
            <tr>
              <td>Sub Total :</td>
              <td>{priceFormater(selected?.orderPrice)}</td>
            </tr>
            <tr>
              <td className="text-muted">Discount :</td>
              <td className="text-muted">- {priceFormater(selected?.totalDiscount)}</td>
            </tr>
            <tr>
              <td className="text-muted">Tax :</td>
              <td className="text-muted">{priceFormater(selected?.tax)}</td>
            </tr>
            <tr>
              <td>
                <p className="fs-5">Total :</p>
              </td>
              <td>
                <p className="fs-5">{priceFormater(selected?.totalPrice)}</p>
              </td>
            </tr>
          </tbody>
        </table>

        <p className="fs-6 fw-semibold">Orders :</p>

        <table className="w-100 mb-3">
          <thead>
            <tr>
              <th>Cake</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {selected?.orders.map((item, index) => (
              <tr key={index}>
                <td>{item.cakeVariant?.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.discount}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default Transaction;
