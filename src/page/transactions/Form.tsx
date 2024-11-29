import Button from "@/components/Button";
import Input from "@/components/Input";
import { useNavigate } from "react-router-dom";
import useTransaction from "./hooks/useTransaction";
import { transactionPath } from "@/path/transaction.path";
import priceFormater from "@/helpers/priceFormater.helper";

const Form = () => {
  const {
    input,
    handleInput,
    handleCreate,
    handleUpdate,
    loading,
    handleOrderChange,
    cakes,
    clearInput,
  } = useTransaction();
  const navigate = useNavigate();

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
        Form <span className="fw-bold">Create</span>
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
              <span>{priceFormater(cake.sellPrice)}</span>
              <input
                onChange={(e) => handleOrderChange(e, cake.id!)}
                name="quantity"
                type="number"
                disabled={cake.stock === 0}
                value={
                  input.orders?.find((order) => order.cakeId === cake.id)
                    ?.quantity || ""
                }
                className="w-20"
              />
            </div>
          ))}
          <div className="mt-2 d-flex justify-content-end gap-3">
            <Button type="button" disabled={loading} isOutline onClick={clearInput}>
              {loading ? "Loading..." : "Clear"}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
          <p>Tax : {priceFormater(input?.tax || 0)}</p>

          <p>Order Price : {priceFormater(input?.orderPrice || 0)}</p>

          <p>Total Discount : {priceFormater(input?.totalDiscount || 0)}</p>

          <p className="fw-semibold">
            Total : {priceFormater(input?.totalPrice || 0)}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
