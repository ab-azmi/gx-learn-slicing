import {
  calculateCOGS,
  getCakes,
  getIngridients,
} from "@/service/api/cake.api";
import { Cake, Ingridient } from "@/types/transaction";
import { Paginate } from "@/types/wraper";
import { useEffect, useState } from "react";

const formInitial = {
  name: "",
  profitMargin: "",
  cogs: 0,
  sellPrice: 0,
  images: "",
  stock: 0,
  cakeVariantId: 0,
  ingridients: [],
  volume: 0,
};

const useCakes = () => {
  const [cakes, setCakes] = useState<Paginate<Cake>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<Cake>(formInitial);
  const [ingridients, setIngridients] = useState<Ingridient[]>([]);

  useEffect(() => {
    setLoading(true);
    getCakes().then((res) => {
      setLoading(false);
      setCakes(res);
    });

    getIngridients().then((res) => {
      setIngridients(res.result);
    });
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const clearInput = () => {
    setInput(formInitial);
  };

  const handleIngridientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { name, value } = e.target;
    const orderExist = input.ingridients?.find((ing) => ing.id === id);
    let newOrders = [...(input.ingridients || [])];

    if (orderExist) {
      newOrders = newOrders.map((ing) =>
        ing.id === id ? { ...ing, [name]: value } : ing
      );
    } else {
      newOrders.push({
        id: id,
        quantity: parseInt(value),
      });
    }

    setInput({
      ...input,
      ingridients: newOrders,
    });
  };

  const handleCOGS = () => {
    calculateCOGS({
      volume: input.volume!,
      margin: input.profitMargin,
      ingridients: input.ingridients!.map((ing) => ({
        id: ing.id,
        quantity: ing.quantity,
      })),
    }).then((res) => {
      console.log(res);
      setInput({
        ...input,
        cogs: res.result.cogs,
        sellPrice: res.result.sellPrice,
      });
    });
  };

  return {
    cakes,
    loading,
    input,
    setInput,
    ingridients,
    clearInput,
    handleInput,
    handleCOGS,
    handleIngridientChange,
  };
};

export default useCakes;
