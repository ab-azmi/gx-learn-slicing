import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import useTransaction from "./hooks/useTransaction";
import { transactionPath } from "@/path/transaction.path";
import priceFormater from "@/helpers/priceFormater.helper";
import { Add } from "iconsax-react";

const Form = () => {
  const {
    input,
    handleCreate,
    handleUpdate,
    loading,
    handleOrderChange,
    cakeVariants,
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
        Transaction <span className="fw-bold">Create</span>
      </h3>
      <div className="d-flex gap-3">
        {cakeVariants?.map((variant) => (
          <div key={variant.id} className="bg-secondary mt-3 rounded-2 p-3">
            <h4>{variant.name}</h4>
            <p>
              {priceFormater((variant.cake?.sellingPrice || 0) + variant.price)}
            </p>
            <div className="d-flex gap-2 justify-content-end">
              <h5>
                {input.orders?.find((order) => order.cakeVariantId === variant.id)
                  ?.quantity || null}
              </h5>
              <Button size="sm" onClick={() => handleOrderChange(variant, 1)}>
                <Add />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-secondary mt-3 rounded-2 p-3 d-flex justify-content-between align-items-center">
        <h5 className="fw-semibold">
          Orders : {
              priceFormater(input?.orders?.reduce(
                (acc, item) =>
                  acc +
                  item.totalPrice!,
                0
              ))
          }
        </h5>
        <h5 className="fw-semibold">
          Total : {priceFormater(input?.totalPrice || 0)}
        </h5>
        <Button type="button" style="fill">
          Process
        </Button>
      </div>
    </div>
  );
};

export default Form;
