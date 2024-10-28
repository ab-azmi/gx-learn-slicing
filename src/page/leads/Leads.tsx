import { Lead } from "@/types/leads";
import Table from "../../components/Table";
import useLeads from "./hooks/useLeads";
import ModalForm from "./components/ModalForm";
import Input from "@/components/Input";

const Leads = () => {
  const {
    leads,
    handleDelete,
    handleEdit,
    loading,
    handleSearch,
    input,
    showModal,
    setShowModal,
    handleInput,
    handleUpdate
  } = useLeads();

  const columns: { key: string; title: string }[] = [
    { key: "code", title: "#" },
    { key: "name", title: "Name" },
    { key: "branch", title: "Branch" },
    { key: "address", title: "Address" },
    { key: "note", title: "Note" },
    { key: "phone", title: "Phone" },
    { key: "created_at", title: "Created" },
    { key: "updated_at", title: "Updated" },
    { key: "probability.name", title: "Probability" },
    { key: "status.name", title: "Status" },
    { key: "type.name", title: "Type" },
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
          onEdit={handleEdit}
          limit={10}
          onSearch={handleSearch}
        />
      )}

      <ModalForm show={showModal} setShow={setShowModal} onSave={handleUpdate}>
        <form action="">
          <Input
            type="text"
            label="Name"
            placeholder="name"
            name="name"
            value={input.name}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Branch"
            placeholder="branch"
            name="branch"
            value={input.branch}
            onChange={handleInput} 
          />
          <Input
            type="text"
            label="Address"
            placeholder="address"
            name="address"
            value={input.address}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Note"
            placeholder="note"
            name="note"
            value={input.note}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Phone"
            placeholder="phone"
            name="phone"
            value={input.phone}
            onChange={handleInput}
          />
        </form>
      </ModalForm>
    </div>
  );
};

export default Leads;
