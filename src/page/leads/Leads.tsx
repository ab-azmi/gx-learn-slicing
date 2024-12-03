import useLeads from "./hooks/useLeads";
import TableLeads from "@/components/TableLeads";
import React from "react";

const objColumn = (key: string, title: string) => ({ key, title });

const Leads = () => {

  const {
    leads,
    loading,
    setSearch,
    handleDelete,
    handleFilter,
    clearFilter,
    refetchLeads,
  } = useLeads();

  const columns: { key: string; title: string }[] = [
    objColumn("code", "#"),
    objColumn("name", "Name"),
    objColumn("branch", "Branch"),
    objColumn("address", "Address"),
    objColumn("note", "Note"),
    objColumn("phone", "Phone"),
    objColumn("created_at", "Created"),
    objColumn("updated_at", "Updated"),
    objColumn("probability.name", "Probability"),
    objColumn("status.name", "Status"),
    objColumn("type.name", "Type"),
  ];

  const bento = [
    {
      label: "Total Ticket",
      value: 20,
    },
    {
      label: "WO In Progress",
      value: 47,
    },
    {
      label: "MyGX App",
      value: 58,
    },
    {
      label: "Highest Priority",
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
      <TableLeads
        data={leads} //sort
        columns={columns}
        onDelete={handleDelete}
        onChangePage={refetchLeads}
        loading={loading}
        onSearch={setSearch}
        onFilter={refetchLeads}
        onClearFilter={clearFilter}
        filter={[
          {
            name: "probability",
            options:[],
            onSelect: handleFilter,
          },
          {
            name: "status",
            options: [
              { value: 2, name: "scheduled" },
              { value: 3, name: "junk" },
              { value: 1, name: "consideration" },
            ],
            onSelect: handleFilter,
          },
        ]}
      />
    </div>
  );
};

export default Leads;
