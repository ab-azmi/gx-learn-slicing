import { cakeVariantFilterForm, transactionForm } from "@/form/transaction.form";
import { getCakes, getVariants } from "@/service/api/cake.api";
import { createTransaction } from "@/service/api/transaction.api";
import AuthStore from "@/store/AuthStore";
import OrderStore from "@/store/OrderStore";
import { Cake, CakeFilter, CakeVariant } from "@/types/cake.type";
import { Transaction } from "@/types/transaction.type";
import { useState } from "react";
import { toast } from "react-toastify";

const useFormTransaction = () => {
    const authStore = AuthStore();
    const {transaction, setTransaction} = OrderStore();
    const [cakes, setCakes] = useState<Cake[]>([]);
    const [receipt, setReceipt] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [cakeVariants, setCakeVariants] = useState<CakeVariant[]>([]);
    const [filters, setFilters] = useState<CakeFilter>(cakeVariantFilterForm);

    const handleConfigForm = () => {
        setTransaction({
            ...transactionForm,
            employeeId: authStore.user?.id || 0,
        })
    }

    const handleFetchCake = () => {
        getCakes().then((res) => {
            setCakes(res.result);
        });
    }

    const handleFetchCakeVariant = () => {
        getVariants().then((res) => {
            setCakeVariants(res.result);
        });
    }

    const handleOrderChange = (
        variant: CakeVariant,
        quantity: number
    ) => {
        const orderExist = transaction.orders.find((order) => order.cakeVariantId === variant.id);
        let newOrders = [...transaction.orders];

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

        setTransaction({
            ...transaction,
            orders: newOrders,
            quantity: newOrders.reduce((acc, curr) => acc + curr.quantity, 0),
        })
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
        handleConfigForm();
    }

    const handleProcess = () => {
        console.log(transaction);
        return;
        const id = toast.loading("Processing...");
        setLoading(true);

        createTransaction(transaction).then((res) => {
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
    };

    return {
        cakes,
        filters,
        receipt,
        loading,
        cakeVariants,
        setFilters,
        setCakeVariants,
        clearFilter,
        fetchVariants,
        clearInput,
        handleProcess,
        handleFetchCake,
        handleOrderChange,
        handleFetchCakeVariant,
    };
};

export default useFormTransaction;
