import { cakeFilter } from "@/param/cake.param";
import {
  deleteCake,
  getCakes,
} from "@/service/api/cake.api";
import { Cake } from "@/types/cake.type";
import { Paginate } from "@/types/wraper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
