import { discountFilter, discountParam } from "@/param/cake.param"
import { createDiscount, getDiscounts, updateDiscount } from "@/service/api/cake.api";
import { Discount, DiscountFilter } from "@/types/cake.type";
import { Paginate } from "@/types/wraper";
import { useState } from "react";
import { toast } from "react-toastify";

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

    const handleCreateDiscount = () => {
        createDiscount(input)
            .then(() => {
                handleGetDiscounts()
                setInput(discountParam)
                toast.success('Discount created')
            })
    }

    const handleUpdateDiscount = () => {
        updateDiscount(input)
            .then(() => {
                handleGetDiscounts()
                setInput(discountParam)
                toast.success('Discount updated')
            })
    }

    return {
        input,
        setInput,
        discounts,
        setDiscounts,
        filters,
        setFilters,
        clearFilter,
        handleCreateDiscount,
        handleGetDiscounts,
        handleUpdateDiscount
    }
}

export default useDiscount