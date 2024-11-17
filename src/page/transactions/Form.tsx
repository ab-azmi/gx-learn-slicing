import Button from "@/components/Button";
import Input from "@/components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useTransaction from "./hooks/useTransaction";
import { transactionPath } from "@/path/transaction.path";
import { getCakes } from "@/service/api/transaction.api";
import { Cake } from "@/types/transaction";

const Form = () => {
  const {
    input,
    handleInput,
    setInput,
    handleCreate,
    handleUpdate,
    loading,
    handleOrderChange,
  } = useTransaction();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cakes, setCakes] = useState<Cake[]>();

  useEffect(() => {
    if (state) {
      setInput(state);
    }

    getCakes().then((res) => {
      setCakes(res.result);
    });
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
          <h5 className="mt-3">Cake Orders</h5>
          {cakes?.map((cake) => (
            <div key={cake.id} className="d-flex w-100 justify-content-between">
              <p>
                [{cake.stock}] {cake.name}
              </p>
              <span>Rp{cake.sellPrice}</span>
              <input
                onChange={(e) => handleOrderChange(e, cake.id)}
                name="quantity"
                type="number"
                value={input.orders?.find((order) => order.cakeId === cake.id)?.quantity || ''}
                className="w-20"
              />
            </div>
          ))}
          <div className="mt-2 d-flex justify-content-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
          {input.tax && (
            <Input
              type="number"
              label="Tax"
              placeholder="John"
              name="tax"
            />
          )}
          {input.orderPrice && (
            <Input
              type="number"
              label="Order Price"
              placeholder="John"
              name="orderPrice"
            />
          )}
          {input.totalPrice && (
            <Input
              type="number"
              label="Total Price"
              placeholder="John"
              name="totalPrice"
            />
          )}
          {input.totalDiscount && (
            <Input
              type="number"
              label="Total Discount"
              placeholder="John"
              name="totalDiscount"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
