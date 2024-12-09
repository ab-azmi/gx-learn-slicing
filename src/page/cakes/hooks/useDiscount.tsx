import { discountFilter, discountParam } from "@/param/cake.param"
import { getDiscounts } from "@/service/api/cake.api";
import { Discount, DiscountFilter } from "@/types/cake.type";
import { Paginate } from "@/types/wraper";
import { useState } from "react";

const useDiscount = () => {
    const [input, setInput] = useState<Discount>(discountParam);
    const [filters, setFilters] = useState<DiscountFilter>(discountFilter);
    const [discounts, setDiscounts] = useState<Paginate<Discount>>();

    const handleGetDiscounts = (page?: number) => {
        getDiscounts(page, filters)
            .then((res) => setDiscounts(res))
    }

    const clearFilter = () => {
        getDiscounts(undefined, discountFilter)
            .then((res) => setDiscounts(res))
    }

    return {
        input,
        setInput,
        discounts,
        setDiscounts,
        filters,
        setFilters,
        clearFilter,
        handleGetDiscounts
    }
}

export default useDiscount