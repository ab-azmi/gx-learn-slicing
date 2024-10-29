import { Lead } from "@/types/leads";
import Table from "../../components/Table";
import useLeads from "./hooks/useLeads";
import ModalForm from "./components/ModalForm";
import Input from "@/components/Input";
import Select from "@/components/Select";

const objColumn = (key: string, title: string) => ({ key, title });

const Leads = () => {
  const {
    leads,
    input,
    loading,
    showModal,
    probabilities,
    openModal,
    handleInput,
    handleSearch,
    setShowModal,
    handleDelete,
    handleForm,
    handleSelect,
    handleFilter,
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
      <h3>
        Welcome to <span className="fw-bold">The Leads</span>
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ipsum.
      </p>
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {leads && (
        <Table<Lead>
          data={leads}
          columns={columns}
          onDelete={handleDelete}
          onEdit={openModal}
          onAdd={openModal}
          limit={10}
          onSearch={handleSearch}
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
