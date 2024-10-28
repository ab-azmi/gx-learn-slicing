import { Lead } from "@/types/leads";
import Table from "../../components/Table";
import useLeads from "./hooks/useLeads";

const Leads = () => {
  const { leads, handleDelete, handleEdit, loading, handleSearch } = useLeads();

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
    </div>
  );
};

export default Leads;
