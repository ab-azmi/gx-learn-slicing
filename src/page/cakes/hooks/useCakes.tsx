import { cakeFilter, cakeForm } from "@/form/cake.form";
import {
  calculateCOGS,
  getCakes,
} from "@/service/api/cake.api";
import { Cake } from "@/types/transaction";
import { Paginate } from "@/types/wraper";
import { useEffect, useState } from "react";

const useCakes = () => {
  const [cakes, setCakes] = useState<Paginate<Cake>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<Cake>(cakeForm);
  const [filters, setFilters] = useState<{ [key: string]: string }>(cakeFilter);

  useEffect(() => {
    setLoading(true);

    getCakes().then((res) => {
      setLoading(false);
      setCakes(res);
    });
  }, []);

  const clearInput = () => {
    setInput(cakeForm);
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
        sellingPrice: res.result.sellPrice,
      });
    });
  };

  const fetchCakes = (page?: number) => {
    setLoading(true);
    getCakes(page, filters).then((res) => {
      setCakes(res);
      setLoading(false);
    });
  }

  const clearFilter = () => {
    setFilters(cakeFilter);
    getCakes().then((res) => {
      setCakes(res);
    });
  }

  return {
    cakes,
    loading,
    input,
    setInput,
    filters,
    setFilters,
    clearFilter,
    clearInput,
    handleCOGS,
    fetchCakes,
    handleIngridientChange,
  };
};

export default useCakes;
