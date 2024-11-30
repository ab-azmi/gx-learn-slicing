import { transactionForm } from "@/form/transaction.form";
import { getCakes, getVariants } from "@/service/api/cake.api";
import { Cake, CakeVariant, Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";

const filterForm = {
    'search': '',
    'cakeId': '',
    'orderBy': '',
    'orderType': '',
};

const useFormTransaction = () => {
    const [cakes, setCakes] = useState<Cake[]>([]);
    const [cakeVariants, setCakeVariants] = useState<CakeVariant[]>([]);
    const [input, setInput] = useState<Transaction>(transactionForm);
    const [filters, setFilters] = useState<{
        'search': string;
        'cakeId'?: string;
        'orderBy'?: string;
        'orderType'?: string;
    }>(filterForm);

    useEffect(() => {
        getCakes().then((res) => {
            setCakes(res.result);
        });

        getVariants().then((res) => {
            setCakeVariants(res.result);
        });
    }, []);

    const handleOrderChange = (
        variant: CakeVariant,
        quantity: number
    ) => {
        ;
        const orderExist = input.orders.find((order) => order.cakeVariantId === variant.id);
        let newOrders = [...input.orders];

        if (orderExist) {
            const price = variant.price + (variant.cake?.sellingPrice || 0);

            newOrders = newOrders.map((order) =>
                order.cakeVariantId === variant.id ?
                    {
                        ...order,
                        'quantity': order.quantity + quantity,
                        'price': price,
                        'totalPrice': price * (order.quantity + quantity)
                    }
                    : order
            );
        } else {
            const price = variant.price + (variant.cake?.sellingPrice || 0);

            newOrders.push({
                cakeVariantId: variant.id,
                price: price,
                totalPrice: price * quantity,
                quantity: quantity,
            });
        }

        setInput({
            ...input,
            orders: newOrders,
        });
    };

    const clearFilter = () => {
        setFilters(filterForm);
        getVariants().then((res) => {
            setCakeVariants(res.result);
        });
    }

    const fetchVariants = () => {
        getVariants(filters).then((res) => {
            setCakeVariants(res.result);
        });
    }

    return {
        cakes,
        input,
        filters,
        cakeVariants,
        setFilters,
        setInput,
        setCakeVariants,
        clearFilter,
        handleOrderChange,
        fetchVariants,
    };
};

export default useFormTransaction;
