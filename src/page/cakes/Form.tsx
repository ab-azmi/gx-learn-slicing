import Button from "@/components/Button";
import Input from "@/components/Input";
import { cakePath } from "@/path/cakes.path";
import { useNavigate } from "react-router-dom";
import useCakes from "./hooks/useCakes";
import priceFormater from "@/helpers/priceFormater.helper";

const Form = () => {
  const {
    loading,
    input,
    handleInput,
    clearInput,
    ingridients,
    handleIngridientChange,
    handleCOGS,
  } = useCakes();
  const navigate = useNavigate();

  const handleSubmit = () => {};

  return (
    <div className="p-4">
      <Button onClick={() => navigate(cakePath.index)}>Back</Button>
      <h3 className="mt-3">
        Form <span className="fw-bold">Create</span>
      </h3>
      <div className="bg-secondary mt-3 rounded-2 p-3 w-50">
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <Input
            type="text"
            label="Cake Name"
            required
            placeholder="Party Cake"
            name="name"
            value={input?.name || ""}
            onChange={handleInput}
          />
          <Input
            type="number"
            label="Volumne per-Month"
            required
            placeholder="100"
            name="volume"
            value={input?.volume?.toString() || ""}
            onChange={handleInput}
          />
          <Input
            type="string"
            label="Profit Margin Percentage"
            required
            placeholder="0.5"
            name="profitMargin"
            value={input?.profitMargin || ""}
            onChange={handleInput}
          />
          {ingridients?.map((ing) => (
            <div key={ing.id} className="d-flex w-100 justify-content-between">
              <p>
                [{ing.quantity} {ing.unit}] {ing.name}
              </p>
              <span>{priceFormater(ing.pricePerUnit || 0)}</span>
              <input
                onChange={(e) => handleIngridientChange(e, ing.id!)}
                name="quantity"
                type="number"
                disabled={ing.quantity === 0}
                value={
                  input.ingridients?.find((data) => data.id === ing.id)
                    ?.quantity || ""
                }
                className="w-20"
              />
              <span>{ing.unit}</span>
            </div>
          ))}
          <div className="mt-2 d-flex justify-content-end gap-3">
            <Button
              type="button"
              disabled={loading}
              isOutline
              onClick={clearInput}
            >
              {loading ? "Loading..." : "Clear"}
            </Button>
            <Button type="button" disabled={loading} onClick={handleCOGS}>
              {loading ? "Loading..." : "Get Sell Price"}
            </Button>
            <Button type="submit" disabled={true}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
