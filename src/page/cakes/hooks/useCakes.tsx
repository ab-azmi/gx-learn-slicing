import { cakeFilter } from "@/form/cake.form";
import {
  deleteCake,
  getCakes,
} from "@/service/api/cake.api";
import { Cake } from "@/types/transaction";
import { Paginate } from "@/types/wraper";
import { useEffect, useState } from "react";

const useCakes = () => {
  const [cakes, setCakes] = useState<Paginate<Cake>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ [key: string]: string }>(cakeFilter);

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
    setLoading(true);
    deleteCake(id).then(() => {
      fetchCakes();
      setLoading(false);
    });
  };

  return {
    cakes,
    loading,
    filters,
    setFilters,
    clearFilter,
    fetchCakes,
    handleDelete,
  };
};

export default useCakes;
