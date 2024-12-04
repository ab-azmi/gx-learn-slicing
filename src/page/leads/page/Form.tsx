import Button from "@/components/Button";
import Input from "@/components/Input";
import { leadPath } from "@/path/lead.path";
import { useLocation, useNavigate } from "react-router-dom";
import useLeads from "./hooks/useLeads";
import Select from "@/components/Select";
import { useEffect } from "react";

const Form = () => {
  const {
    input,
    handleInput,
    handleSelect,
    setInput,
    handleCreate,
    handleUpdate,
    loading,
  } = useLeads();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setInput(state);
    }
  }, [state, setInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <div className="p-4">
      <Button onClick={() => navigate(leadPath.index)}>Back</Button>
      <h3 className="mt-3">
        Form <span className="fw-bold">{state ? "Edit" : "Create"}</span>
      </h3>
      <div className="bg-secondary mt-3 rounded-2 p-3 w-50">
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <Input
            type="text"
            label="Name"
            required
            placeholder="name"
            name="name"
            value={input?.name || ""}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Branch"
            required
            placeholder="branch"
            name="branch"
            value={input?.branch || ""}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Address"
            placeholder="address"
            name="address"
            value={input?.address || ""}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Note"
            placeholder="note"
            name="note"
            value={input?.note || ""}
            onChange={handleInput}
          />
          <Input
            type="text"
            label="Phone"
            placeholder="phone"
            name="phone"
            value={input?.phone || ""}
            onChange={handleInput}
          />
          <Select
            options={[]}
            label="Probability"
            placeholder="probability"
            name="lead_probability_id"
            value={input.lead_probability_id?.toString()}
            onChange={handleSelect}
          />
          <div className="mt-2 d-flex justify-content-end">
            <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
