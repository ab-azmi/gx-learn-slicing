import { cakeVariantFilterForm, transactionForm } from "@/form/transaction.form";
import { getCakes, getVariants } from "@/service/api/cake.api";
import { createTransaction } from "@/service/api/transaction.api";
import AuthStore from "@/store/AuthStore";
import { Cake, CakeFilter, CakeVariant } from "@/types/cake.type";
import { Transaction } from "@/types/transaction.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFormTransaction = () => {
    const store = AuthStore();
    const [cakes, setCakes] = useState<Cake[]>([]);
    const [receipt, setReceipt] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [cakeVariants, setCakeVariants] = useState<CakeVariant[]>([]);
    const [input, setInput] = useState<Transaction>(transactionForm);
    const [filters, setFilters] = useState<CakeFilter>(cakeVariantFilterForm);

    useEffect(() => {
        setInput({
            ...input,
            employeeId: store.user?.id,
        })

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

            if (orderExist.quantity + quantity <= 0) {
                newOrders = newOrders.filter((order) => order.cakeVariantId !== variant.id);
            } else {
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
            }
        } else {
            const price = variant.price + (variant.cake?.sellingPrice || 0);

            newOrders.push({
                cakeVariantId: variant.id,
                price: price,
                totalPrice: price * quantity,
                quantity: quantity,
                cakeVariant: variant,
            });
        }

        setInput({
            ...input,
            quantity: newOrders.reduce((acc, item) => acc + item.quantity, 0),
            orders: newOrders,
        });
    };

    const clearFilter = () => {
        setFilters(cakeVariantFilterForm);
        getVariants().then((res) => {
            setCakeVariants(res.result);
        });
    }

    const fetchVariants = () => {
        getVariants(filters).then((res) => {
            setCakeVariants(res.result);
        });
    }

    const clearInput = () => {
        setInput(transactionForm);
    }

    const handleProcess = () => {
        const id = toast.loading("Processing...");
        setLoading(true);

        createTransaction(input).then((res) => {
            setLoading(false);
            toast.update(id, {
                render: "Transaction Created",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            clearInput();

            setReceipt(res.result);
        })
    }

    return {
        cakes,
        input,
        filters,
        receipt,
        loading,
        cakeVariants,
        setFilters,
        setInput,
        setCakeVariants,
        clearFilter,
        handleOrderChange,
        fetchVariants,
        clearInput,
        handleProcess
    };
};

export default useFormTransaction;
