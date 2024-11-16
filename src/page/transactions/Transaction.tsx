import useTransaction from "./hooks/useTransaction";
import TableTransaction from "@/components/TableTransaction";
import React from "react";

const Transaction = () => {

  const {
    transactions,
    loading,
    setSearch,
    handleDelete,
    handleFilter,
    clearFilter,
    refetchLeads,
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
              <div className="w-100 bg-secondary rounded-2 p-3">
                <div className="bg-muted rounded-2 w-20" style={{ height: '10px' }}></div>
                <div className="bg-muted rounded-2 w-100 mt-4" style={{ height: '8px' }}></div>
              </div>
            ) : (
              <div className="w-100 bg-secondary rounded-2 p-3">
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
        onChangePage={refetchLeads}
        loading={loading}
        onSearch={setSearch}
        onFilter={refetchLeads}
        onClearFilter={clearFilter}
        filter={[
          {
            name: "status",
            options: [
              { id: 2, name: "scheduled" },
              { id: 3, name: "junk" },
              { id: 1, name: "consideration" },
            ],
            onSelect: handleFilter,
          },
        ]}
      />
    </div>
  );
};

export default Transaction;
