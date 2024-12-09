import { cakeFilter, cakeRestockParam } from "@/param/cake.param";
import {
  deleteCake,
  getCakes,
  updateCake,
} from "@/service/api/cake.api";
import { Cake, CakeFilter, CakeRestock } from "@/types/cake.type";
import { Paginate } from "@/types/wraper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCakes = () => {
  const [cakes, setCakes] = useState<Paginate<Cake>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<CakeFilter>(cakeFilter);
  const [restock, setRestock] = useState<CakeRestock>(cakeRestockParam);

  useEffect(() => {
    setLoading(true);

    getCakes().then((res) => {
      setLoading(false);
      setCakes(res);
    });
  }, []);

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

  const handleDelete = (id: number) => {
    const notify = toast.loading("Deleting...");
    setLoading(true);

    deleteCake(id).then(() => {
      fetchCakes();

      setLoading(false);
      toast.update(notify, {
        render: "Deleted",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    });
  };

  const handleAdjustStock = (sellNum: number | null, nonSellNum: number | null) => {
    if (sellNum !== null) {
      setRestock({
        ...restock,
        addStockSell: (
          typeof restock.addStockSell === "string" ? 
          parseInt(restock.addStockSell) : 
          restock.addStockSell) 
          + sellNum
      });
    }

    if (nonSellNum !== null) {
      setRestock({
        ...restock,
        addStockNonSell: (
          typeof restock.addStockNonSell === "string" ? 
          parseInt(restock.addStockNonSell) : 
          restock.addStockNonSell) 
          + nonSellNum
      });
    }
  }

  const handleUpdateIsSell = (cake: Cake) => {
    updateCake({
      ...cake,
      isSell: !cake.isSell,
    }).then(() => {
      fetchCakes();
      toast.success("Status updated");
    });
  }

  return {
    cakes,
    loading,
    filters,
    setFilters,
    restock,
    setRestock,
    clearFilter,
    fetchCakes,
    handleDelete,
    handleAdjustStock,
    handleUpdateIsSell,
  };
};

export default useCakes;
