import Button from "@/components/Button";
import Input from "@/components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useTransaction from "./hooks/useTransaction";
import { transactionPath } from "@/path/transaction.path";

const Form = () => {
  const {
    input,
    handleInput,
    handleSelect,
    setInput,
    handleCreate,
    handleUpdate,
    loading,
  } = useTransaction();
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
      <Button onClick={() => navigate(transactionPath.index)}>Back</Button>
      <h3 className="mt-3">
        Form <span className="fw-bold">{state ? "Edit" : "Create"}</span>
      </h3>
      <div className="bg-secondary mt-3 rounded-2 p-3 w-50">
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <Input
            type="text"
            label="Customer Name"
            required
            placeholder="John"
            name="customerName"
            value={input?.customerName || ""}
            onChange={handleInput}
          />
          <h5>Cake Orders</h5>
          
          <div className="mt-2 d-flex justify-content-end">
            <Button type="submit" disabled={true}>{loading ? "Loading..." : "Submit"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
