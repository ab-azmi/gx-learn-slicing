import useLeads from "./hooks/useLeads";
import ModalForm from "./components/ModalForm";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TableLeads from "@/components/TableLeads";

const objColumn = (key: string, title: string) => ({ key, title });

const Leads = () => {
  const {
    leads,
    input,
    loading,
    showModal,
    probabilities,
    openModal,
    setSearch,
    handleInput,
    filterLeads,
    setShowModal,
    handleDelete,
    handleForm,
    handleSelect,
    handleFilter,
    clearFilter,
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

  return (
    <div className="p-4">
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="d-flex gap-3 w-100 mb-3">
        <div className="w-100 bg-white rounded-4 p-3">
          <h3 className="fw-bold">20</h3>
          <h6>  
            Total Ticket &nbsp;
            <span className="text-muted">
              (Today<span className="text-danger">*</span>)
            </span>
          </h6>
        </div>
        <div className="w-100 bg-white rounded-4 p-3">
        <h3 className="fw-bold">47</h3>
          <h6>  
            WO In Progress &nbsp;
            <span className="text-muted">
              (Today<span className="text-danger">*</span>)
            </span>
          </h6>
        </div>
        <div className="w-100 bg-white rounded-4 p-3">
        <h3 className="fw-bold">58</h3>
          <h6>  
            MyGX App &nbsp;
            <span className="text-muted">
              (Today<span className="text-danger">*</span>)
            </span>
          </h6>
        </div>
        <div className="w-100 bg-white rounded-4 p-3">
        <h3 className="fw-bold">17</h3>
          <h6>  
            Highest Priority &nbsp;
            <span className="text-muted">
              (Today<span className="text-danger">*</span>)
            </span>
          </h6>
        </div>
      </div>
      {leads && (
        <TableLeads
          data={leads} //sort
          columns={columns}
          onDelete={handleDelete}
          onEdit={openModal}
          onAdd={openModal}
          limit={10}
          onSearch={setSearch}
          onFilter={filterLeads}
          onClearFilter={clearFilter}
          filter={[
            {
              name: "probability",
              options: probabilities || [],
              onSelect: handleFilter,
            },
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
      )}

      <ModalForm show={showModal} setShow={setShowModal} onSave={handleForm}>
        <form action="" className="d-flex flex-column gap-2">
          <Input
            type="text"
            label="Name"
            placeholder="name"
            name="name"
            value={input.name || ""}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Branch"
            placeholder="branch"
            name="branch"
            value={input.branch || ""}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Address"
            placeholder="address"
            name="address"
            value={input.address || ""}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Note"
            placeholder="note"
            name="note"
            value={input.note || ""}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Phone"
            placeholder="phone"
            name="phone"
            value={input.phone || ""}
            onChange={handleInput}
          />
          <Select
            options={probabilities || []}
            label="Probability"
            placeholder="probability"
            name="lead_probability_id"
            value={input?.lead_probability_id?.toString()}
            onChange={handleSelect}
          />
        </form>
      </ModalForm>
    </div>
  );
};

export default Leads;
