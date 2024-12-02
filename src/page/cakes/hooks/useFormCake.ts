import { cakeForm } from "@/form/cake.form";
import { calculateCOGS, getCake, getIngredients } from "@/service/api/cake.api";
import { getSettings } from "@/service/api/setting.api";
import { Cake, Ingredient } from "@/types/transaction"
import { useState } from "react"

const useFormCake = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState<Cake>(cakeForm);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const fetchIngredients = () => {
        setLoading(true);
        getIngredients().then((res) => {
            setIngredients(res.result);
            setLoading(false);
        });
    }

    const fetchCake = (id: number) => {
        getCake(id).then((res) => {
            setInput(res.result);
        });
    }

    const fetchProfitMargin = () => {
        getSettings({
            'key': 'profit_margin'
        }).then((res) => {
            setInput({
                ...input,
                'profitMargin': parseFloat(res.result[0].value)
            });
        });
    }
 
    const handleIngredientChange = (ingredient: Ingredient, quantity: number) => {
        const ingredientExist = input.ingredients?.find((ing) => ing.id === ingredient.id);
        let newIngredients = [...input.ingredients || []];

        if(ingredientExist) {
            newIngredients = newIngredients.map((ing) => 
                ing.id === ingredient.id ? 
                {
                    ...ing,
                    'quantity': quantity,
                } : ing
            );
        } else {
            newIngredients.push({
                'quantity': quantity,
                'id': ingredient.id
            });
        }

        setInput({
            ...input,
            'ingredients': newIngredients
        });
    }

    const fetchCOGS = () => {
        calculateCOGS({
            'margin': input.profitMargin,
            'ingredients': input.ingredients || []
        }).then((res) => {
            setInput({
                ...input,
                'cogs': res.result.COGS,
                'sellingPrice': res.result.sellingPrice
            });
        })
    }

    const clearInput = () => {
        setInput(cakeForm);
    }

    const handleSubmit = () => {
        console.log(input);
    }

    return {
        ingredients,
        input,
        loading,
        setInput,
        fetchCOGS,
        fetchCake,
        clearInput,
        handleSubmit,
        fetchIngredients,
        fetchProfitMargin,
        handleIngredientChange,
    }
}

export default useFormCake