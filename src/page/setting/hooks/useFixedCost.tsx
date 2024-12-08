import { fixedCostFilterParam, fixedCostParam } from "@/param/setting.param"
import { deleteFixedCost, getFixedCost, getFixedCostById, updateFixedCost } from "@/service/api/setting.api"
import { FixedCost, FixedCostFilter } from "@/types/setting.type"
import { Paginate } from "@/types/wraper"
import { useState } from "react"
import { toast } from "react-toastify"

const useFixedCost = () => {
    const [fixedCosts, setFixedCosts] = useState<Paginate<FixedCost>>()
    const [filters, setFilters] = useState<FixedCostFilter>(fixedCostFilterParam);
    const [input, setInput] = useState<FixedCost>(fixedCostParam);

    const handleFetchFixedCost = (page?: number) => {
        getFixedCost(page, filters)
            .then((res) => {
                setFixedCosts(res)
            });
    }

    const handleUpdateFixedCost = () => {
        const id = toast.loading("Updating fixed cost...");

        updateFixedCost(input)
            .then(() => {
                handleFetchFixedCost()
                toast.update(id, {
                    render: "Fixed cost updated",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                });
            })
    }

    const hanldeFetchFixedCostById = (id: number) => {
        getFixedCostById(id)
            .then((res) => {
                setInput(res)
            })
    }

    const handleDeleteFixedCost = (id: number) => {
        const notif = toast.loading("Archiving fixed cost...");

        deleteFixedCost(id)
            .then(() => {
                handleFetchFixedCost()
                toast.update(notif, {
                    render: "Fixed cost Archived",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                });
            })
    }

    const handleCreateFixedCost = () => {
        const id = toast.loading("Creating fixed cost...");

        updateFixedCost(input)
            .then(() => {
                handleFetchFixedCost()
                toast.update(id, {
                    render: "Fixed cost created",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                });
            })
    }

    const handleClearFilter = () => {
        setFilters(fixedCostFilterParam)
        getFixedCost(undefined, fixedCostFilterParam)
        .then((res) => {
            setFixedCosts(res)
        });
    }

    return {
        fixedCosts,
        setFixedCosts,
        filters,
        setFilters,
        input,
        setInput,
        handleFetchFixedCost,
        handleUpdateFixedCost,
        hanldeFetchFixedCostById,
        handleDeleteFixedCost,
        handleCreateFixedCost,
        handleClearFilter
    }
}

export default useFixedCost