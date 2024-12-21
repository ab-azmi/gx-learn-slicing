import { useState } from "react"
import { Ingredient, IngredientFilter } from "@/types/cake.type"
import { IngredientFilterParam, IngredientParam } from "@/param/cake.param"
import { createIngredient, deleteIngredient, getIngredientById, getIngredients, updateIngredient } from "@/service/api/cake.api"
import { Paginate } from "@/types/wraper"
import { toast } from "react-toastify"

const useIngredient = () => {
    const [ingredients, setIngredients] = useState<Paginate<Ingredient>>()
    const [input, setInput] = useState<Ingredient>(IngredientParam)
    const [filters, setFilters] = useState<IngredientFilter>(IngredientFilterParam)
  
    const handleGetIngredients = (page?: number) => {
        getIngredients(page, filters)
        .then((res) => {
            setIngredients(res)
        });
    }

    const handleGetIngredientById = (id: number) => {
        getIngredientById(id)
        .then((res) => {
            setInput(res.result)
        });
    }

    const handleCreateIngredient = () => {
        const id = toast.loading("Creating ingredient...");

        createIngredient(input)
        .then(() => {
            setInput(IngredientParam)
            handleGetIngredients()
            toast.update(id, {
                render: "Ingredient created",
                type: "success",
                isLoading: false,
                autoClose: 2000
            });
        })
    }

    const handleUpdateIngredient = () => {
        const id = toast.loading("Updating ingredient...");

        updateIngredient(input)
        .then(() => {
            setInput(IngredientParam)
            handleGetIngredients()
            toast.update(id, {
                render: "Ingredient updated",
                type: "success",
                isLoading: false,
                autoClose: 2000
            });
        })
    }

    const handleDeleteIngredient = (id: number) => {
        const notif = toast.loading("Archiving ingredient...");

        deleteIngredient(id)
        .then(() => {
            handleGetIngredients()
            toast.update(notif, {
                render: "Ingredient Archived",
                type: "success",
                isLoading: false,
                autoClose: 2000
            });
        })
    }

    const clearFilter = () => {
        setFilters(IngredientFilterParam)
        getIngredients(undefined, IngredientFilterParam)
        .then((res) => {
            setIngredients(res)
        });
    }

    return {
        input,
        setInput,
        filters,
        setFilters,
        ingredients,
        setIngredients,
        handleGetIngredients,
        handleGetIngredientById,
        handleCreateIngredient,
        handleUpdateIngredient,
        handleDeleteIngredient,
        clearFilter
    }
}

export default useIngredient