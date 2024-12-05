import { cakeFilter } from "@/form/cake.form";
import { transactionForm } from "@/form/transaction.form";
import { Cake, CakeFilter } from "@/types/cake.type";
import { Transaction } from "@/types/transaction.type";
import { create } from "zustand";

type Props = {
    transaction: Transaction;
    setTransaction: (transaction: Transaction) => void;
    cakes: Cake[];
    setCakes: (cakes: Cake[]) => void;
    filters: CakeFilter;
    setFilters: (filters: CakeFilter) => void;
}

const OrderStore = create<Props>((set) => ({
    transaction: transactionForm,
    setTransaction: (transaction) => set({ transaction }),
    cakes: [],
    setCakes: (cakes) => set({ cakes }),
    filters: cakeFilter,
    setFilters: (filters) => set({ filters }),
}));

export default OrderStore;