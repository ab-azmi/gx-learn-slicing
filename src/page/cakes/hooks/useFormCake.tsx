import { cakeParam } from "@/param/cake.param";
import { calculateCOGS, createCake, getCake, getIngredients, updateCake } from "@/service/api/cake.api";
import { getSettings } from "@/service/api/setting.api";
import { Cake, Ingredient } from "@/types/cake.type";
import { useState } from "react"
import { toast } from "react-toastify";

const useFormCake = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState<Cake>(cakeParam);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [defaultMargin, setDefaultMargin] = useState(0);

    const fetchIngredients = () => {
        setLoading(true);
        getIngredients().then((res) => {
            setIngredients(res.result);
            setLoading(false);
        });
    }

    const fetchCake = (id: number) => {
        getCake(id).then((res) => {
            setInput({
                ...res.result,
                'ingredients': res.result.ingredients?.map((ing: Ingredient) => ({
                    'id': ing.id,
                    'quantity': ing.pivot?.quantity
                }))
            });
        });
    }

    const fetchProfitMargin = () => {
        getSettings({
            'key': 'profit_margin'
        }).then((res) => {
            setDefaultMargin(res.result[0].value);
        });
    }

    const handleIngredientChange = (ingredient: Ingredient, quantity: number) => {
        const ingredientExist = input.ingredients?.find((ing) => ing.id === ingredient.id);
        let newIngredients = [...input.ingredients || []];

        if (ingredientExist) {
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
                'COGS': res.result.COGS,
                'sellingPrice': res.result.sellingPrice
            });
        })
    }

    const clearInput = () => {
        setInput(cakeParam);
    }

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        
        const id = toast.loading("Submitting...");
        setLoading(true);

        if (input.id) {
            updateCake(input).then(() => {
                setLoading(false);
                toast.update(id, {
                    render: "Updated",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            });

            return;
        }

        createCake(input).then((res) => {
            setLoading(false);
            if (res.status.code == 200) {
                clearInput();
                toast.update(id, {
                    render: "Created",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        });
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages = [...input.images || []];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                newImages.push({
                    link: '',
                    path: '',
                    file: file,
                });
                setInput((prev) => ({
                    ...prev,
                    images: [...newImages],
                }));
            };
            reader.readAsDataURL(file);
        });

    }

    return {
        ingredients,
        input,
        loading,
        setInput,
        defaultMargin,
        fetchCOGS,
        fetchCake,
        clearInput,
        handleSubmit,
        handleImageUpload,
        fetchIngredients,
        fetchProfitMargin,
        handleIngredientChange,
    }
}

export default useFormCake