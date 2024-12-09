import Button from "@/components/Button";
import Input from "@/components/Input";
import cakePath from "@/path/cakes.path";
import { useLocation, useNavigate } from "react-router-dom";
import priceFormater from "@/helpers/priceFormater.helper";
import useFormCake from "@/page/cakes/hooks/useFormCake";
import handleInput from "@/helpers/input.helper";
import { useEffect, useRef, useState } from "react";
import { Add, AddSquare, Trash } from "iconsax-react";
import ModalConfirm from "@/components/ModalConfirm";
import Modal from "@/components/Modal";
import { CakeVariant } from "@/types/cake.type";
import { variantParam } from "@/param/cake.param";

const CakeForm = () => {
  const {
    input,
    loading,
    setInput,
    ingredients,
    fetchCOGS,
    fetchCake,
    handleSubmit,
    defaultMargin,
    fetchIngredients,
    handleImageUpload,
    fetchProfitMargin,
    handleIngredientChange } = useFormCake();

  const navigate = useNavigate();
  const { state } = useLocation();
  const [confirm, setConfirm] = useState(false);
  const [confirmVariant, setConfirmVariant] = useState(false);
  const [variant, setVariant] = useState<CakeVariant>(variantParam);
  const [showModal, setShowModal] = useState(false);
  const selectedVariant = useRef<{index: number, name: string}>();

  useEffect(() => {
    fetchIngredients();
    fetchProfitMargin();

    if (state) {
      fetchCake(state.id);
    }
  }, []);


  const handleAddVariant = () => {
    setShowModal(false);
    setInput({
      ...input,
      variants: [...(input?.variants || []), variant]
    });
  }

  const handleRemoveVariant = (index: number) => {
    setInput({
      ...input,
      variants: input?.variants?.filter((_, i) => i !== index)
    });
  }

  return (
    <section className="p-4">
      <div className="hstack gap-3 mb-3">
        <Button onClick={() => navigate(cakePath.index)}>Back</Button>

        <h3 className="mt-3">
          Form <span className="fw-bold">
            {state ? "Edit" : "Create"}
          </span>
        </h3>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card-secondary">
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
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-secondary">
            <form className="vstack gap-2">
              <Input
                type="string"
                label={`Profit Margin (default ${defaultMargin}%)`}
                placeholder="0"
                name="profitMargin"
                value={''}
                onChange={(e) => handleInput(e, setInput, input)}
              />

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

              <div className="hstack gap-2 mt-2 flex-wrap">
                {input.images?.map((img, index) => (
                  <div key={index} className="cake-image-card position-relative">
                    <button
                      onClick={() => {
                        setInput({
                          ...input,
                          images: input.images?.filter((_, i) => i !== index)
                        });
                      }}
                      className="position-absolute border-0 bottom-2 start-0 rounded-2 bg-danger">
                      <Trash size={20} />
                    </button>
                    {img.file ? (
                      <img src={URL.createObjectURL(img.file)} alt="cake" className="h-100 w-100" />
                    ) : (
                      <img src={img.link} alt="cake" className="h-100 w-100" />
                    )}
                  </div>
                ))}
                <label htmlFor="image-upload"
                  className="cake-image-card">
                  <input
                    id="image-upload"
                    style={{ display: 'none' }}
                    type="file"
                    multiple
                    onChange={handleImageUpload} />
                  <AddSquare size={32} />
                </label>
              </div>

              <div className="mt-2 hstack justify-content-end gap-3">
                <Button type="button" disabled={loading} onClick={fetchCOGS}>
                  {loading ? "Loading..." : "Calculate Selling Price"}
                </Button>
                <Button type="button" disabled={input.sellingPrice == 0} onClick={() => setConfirm(true)}>
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <div className="card-secondary mt-3">
        <h4 className="mb-3">Cake Variants</h4>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Additional Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {input?.variants?.length ? (
                input?.variants.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <p className="text-capitalize">
                        #{index + 1}
                      </p>
                    </td>
                    <td className="px-3">
                      <div>
                        {item.name}
                      </div>
                    </td>
                    <td className="px-3">
                      <div>
                        {priceFormater(item.price)}
                      </div>
                    </td>

                    <td>
                      <div className="hstack gap-1">
                        <Button
                          className="bg-transparent border-0 text-danger"
                          onClick={() => {
                            selectedVariant.current = { index, name: item.name };
                            setConfirmVariant(true);
                          }}
                        >
                          <Trash size="24" variant="Bulk" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    {loading ? "Loading..." : " No data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="w-100 hstack justify-content-center">
            <button className="bg-transparent border-0" onClick={() => setShowModal(true)}>
              <Add size={24} variant="Bulk" className="text-primary" />
            </button>
          </div>
        </div>
      </div>

      <ModalConfirm
        show={confirm}
        onClose={() => setConfirm(false)}
        title={state ? "Edit Cake" : "Create Cake"}
        message={`Are you sure want to ${state ? "edit" : "create"} ${input.name} cake?`}
        onConfirm={() => {
          handleSubmit();
          setConfirm(false);
        }}
      />

      <ModalConfirm
        show={confirmVariant}
        onClose={() => setConfirmVariant(false)}
        title="Archive Variant"
        message={`Are you sure want to remove ${selectedVariant.current?.name} variant?`}
        onConfirm={() => {
          if (selectedVariant.current) {
            handleRemoveVariant(selectedVariant.current.index);
          }
          setConfirmVariant(false);
        }}
      />

      <Modal title="Add Variant" show={showModal} onClose={() => setShowModal(false)}>
        <form>
          <Input
            type="text"
            label="Variant Name"
            required
            placeholder="Chocolate"
            name="name"
            value={variant.name}
            onChange={(e) => handleInput(e, setVariant, variant)}
          />
          <Input
            type="number"
            label="Additional Price"
            required
            placeholder="100"
            name="price"
            value={variant.price?.toString()}
            onChange={(e) => handleInput(e, setVariant, variant)}
          />
          <Button onClick={() => handleAddVariant()} className="w-100 mt-3">
            Add
          </Button>
        </form>
      </Modal>
    </section>
  );
};

export default CakeForm;
