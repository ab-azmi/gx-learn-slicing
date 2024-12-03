import Button from "@/components/Button";
import Input from "@/components/Input";
import { cakePath } from "@/path/cakes.path";
import { useLocation, useNavigate } from "react-router-dom";
import priceFormater from "@/helpers/priceFormater.helper";
import useFormCake from "./hooks/useFormCake";
import handleInput from "@/helpers/input.helper";
import { useEffect } from "react";

const Form = () => {
  const {
    input,
    loading,
    setInput,
    ingredients,
    clearInput,
    fetchCOGS,
    fetchCake,
    handleSubmit,
    defaultMargin,
    fetchIngredients,
    fetchProfitMargin,
    handleIngredientChange } = useFormCake();

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    fetchIngredients();
    fetchProfitMargin();

    if(state) {
      fetchCake(state.id);
    }
  }, [])

  return (
    <section className="p-4">
      <Button onClick={() => navigate(cakePath.index)}>Back</Button>
      
      <h3 className="mt-3">
        Form <span className="fw-bold">
          {state ? "Edit" : "Create"}
        </span>
      </h3>

      <div className="row">
        <div className="col-md-6">
          <div className="card-secondary">
            <Input
              type="string"
              label={`Profit Margin (default ${defaultMargin}%)`}
              placeholder="0"
              name="profitMargin"
              value={''}
              onChange={(e) => handleInput(e, setInput, input)}
            />

            <table className="mt-3">
              <thead>
                <tr>
                  <th>Stock (Unit)</th>
                  <th>Name</th>
                  <th>Price/Unit</th>
                  <th>Using (Unit)</th>
                </tr>
              </thead>
              <tbody>
                {ingredients?.map((ing) => (
                  <tr key={ing.id}>
                    <td className="w-30">
                      {ing.quantity} {ing.unit?.name}
                    </td>
                    <td className="w-20">
                      {ing.name}
                    </td>
                    <td className="w-20">{priceFormater(ing.price || 0)}</td>
                    <td className="w-30">
                      <Input
                        onChange={(e) => handleIngredientChange(ing, +e.target.value)}
                        name="quantity"
                        type="number"
                        placeholder="0"
                        value={(input.ingredients?.find((item) => item.id === ing.id)?.quantity || '').toString()}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-2 hstack justify-content-end gap-3">
              <Button
                type="button"
                disabled={loading}
                isOutline
                onClick={clearInput}
              >
                {loading ? "Loading..." : "Clear"}
              </Button>
              <Button type="button" disabled={loading} onClick={fetchCOGS}>
                {loading ? "Loading..." : "Calculate Selling Price"}
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-secondary">
            <form onSubmit={handleSubmit} className="vstack gap-2">
              <Input
                type="text"
                label="Cake Name"
                required
                placeholder="Party Cake"
                name="name"
                value={input?.name}
                onChange={(e) => handleInput(e, setInput, input)}
              />

              <Input
                type="number"
                label="Stock"
                placeholder="3"
                name="stock"
                value={input.stock?.toString()}
                onChange={(e) => handleInput(e, setInput, input)}
              />

              <Input
                type="string"
                label="Cost of Goods Sold (COGS)"
                placeholder=""
                name="COGS"
                value={input.COGS?.toString()}
                onChange={(e) => handleInput(e, setInput, input)}
              />

              <Input
                type="string"
                label="Selling Price"
                placeholder=""
                name="sellingPrice"
                value={input.sellingPrice?.toString()}
                onChange={(e) => handleInput(e, setInput, input)}
              />

              <div className="mt-2 hstack justify-content-end gap-3">
                <Button
                  type="button"
                  disabled={loading}
                  isOutline
                  onClick={clearInput}
                >
                  {loading ? "Loading..." : "Clear"}
                </Button>
                <Button type="submit" disabled={input.sellingPrice == 0}>
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
