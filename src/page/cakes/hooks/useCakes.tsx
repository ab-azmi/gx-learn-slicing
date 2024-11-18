import { getCakes } from "@/service/api/cake.api";
import { Cake } from "@/types/transaction";
import { Paginate } from "@/types/wraper";
import { useEffect, useState } from "react";

const useCakes = () => {
  const [cakes, setCakes] = useState<Paginate<Cake>>();

  useEffect(() => {
    getCakes().then((res) => {
      setCakes(res);
    });
  }, []);

  return {
    cakes,
  };
};

export default useCakes;
