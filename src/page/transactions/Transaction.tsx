import Modal from "@/components/Modal";
import TableTransaction from "./components/TableTransaction";
import useTransaction from "./hooks/useTransaction";
import React, { useState } from "react";
import { Transaction as TransactionType } from "@/types/transaction.type";

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

  const bento = [
    {
      label: "Transaction",
      value: transactions?.result?.length || 0,
    },
    {
      label: "Transaction This Month",
      value: 47,
    },
    {
      label: "Cake Sold",
      value: transactions?.result?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    },
    {
      label: "Cake Sold This Month",
      value: 17,
    },
  ];

  return (
    <div className="p-4">
      <div className="d-flex gap-3 w-100 mb-3 flex-wrap flex-md-nowrap">
        {bento.map((item, index) => (
          <React.Fragment key={index}>
            {loading ? (
              <div className="w-100 card-secondary">
                <div className="bg-muted rounded-2 w-20" style={{ height: '10px' }}></div>
                <div className="bg-muted rounded-2 w-100 mt-4" style={{ height: '8px' }}></div>
              </div>
            ) : (
              <div className="w-100 card-secondary">
                <h3 className="fw-bold">{item.value}</h3>
                <h6>
                  {item.label} &nbsp;
                  <span className="text-muted">
                    (Today<span className="text-danger">*</span>)
                  </span>
                </h6>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

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
        <h6 className="text-muted">{selected?.number}</h6>

        <div className="w-100">
          <table className="w-100">
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
        </div>
      </Modal>
    </div>
  );
};

export default Transaction;
