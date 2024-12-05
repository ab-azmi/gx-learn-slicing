import Modal from "@/components/Modal";
import TableTransaction from "./components/TableTransaction";
import useTransaction from "./hooks/useTransaction";
import React from "react";

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
      />

      <Modal show={false} onClose={() => {}} title="Transaction Detail"></Modal>
    </div>
  );
};

export default Transaction;
