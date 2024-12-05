import { transactionParam } from "@/param/transaction.param";
import { getCakes, getVariants } from "@/service/api/cake.api";
import { getSettings } from "@/service/api/setting.api";
import { createTransaction } from "@/service/api/transaction.api";
import AuthStore from "@/store/AuthStore";
import OrderStore from "@/store/OrderStore";
import { CakeVariant } from "@/types/cake.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFormTransaction = () => {
    const authStore = AuthStore();
    const {transaction, setTransaction, filters, cakes, setCakes} = OrderStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [cakeVariants, setCakeVariants] = useState<CakeVariant[]>([]);
    const [tax, setTax] = useState<number>(0);

    useEffect(() => {
        hanldeFetchMargin();

        if(authStore.user) {
            setTransaction(
                {
                    ...transaction,
                    employeeId: authStore.user.id,
                }
            )
        }

    }, [authStore.user])

    const hanldeFetchMargin = () => {
        getSettings({key: 'tax'}).then((res) => {
            setTax(res.result[0].value);
        })
    }

    const handleFetchCake = () => {
        getCakes(0, filters).then((res) => {
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

        const subTotal = newOrders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
        const totalDiscount = newOrders.reduce((acc, curr) => acc + (curr.cakeVariant?.cake?.totalDiscount || 0), 0);
        const taxRp = subTotal * (tax / 100);

        setTransaction({
            ...transaction,
            orders: newOrders,
            quantity: newOrders.reduce((acc, curr) => acc + curr.quantity, 0),
            orderPrice: subTotal,
            totalDiscount: totalDiscount,
            tax: taxRp,
            totalPrice: subTotal + taxRp,
        })
    };

    const clearInput = () => {
        setTransaction({
            ...transactionParam,
            employeeId: authStore.user?.id || 0,
        })
    }

    const handleProcess = () => {
        const id = toast.loading("Processing...");
        setLoading(true);

        createTransaction(transaction).then(() => {
            setLoading(false);
            toast.update(id, {
                render: "Transaction Created",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            clearInput();
        })
    };

    return {
        tax,
        cakes,
        loading,
        cakeVariants,
        setCakeVariants,
        hanldeFetchMargin,
        clearInput,
        handleProcess,
        handleFetchCake,
        handleOrderChange,
        handleFetchCakeVariant,
    };
};

export default useFormTransaction;
