import { cakeFilter } from "@/param/cake.param";
import { transactionForm } from "@/param/transaction.param";
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
    clearFilters: () => void;
}

const OrderStore = create<Props>((set) => ({
    transaction: transactionForm,
    setTransaction: (transaction) => set({ transaction }),
    cakes: [],
    setCakes: (cakes) => set({ cakes }),
    filters: cakeFilter,
    setFilters: (filters) => set({ filters }),
    clearFilters: () => set({ filters: cakeFilter }),
}));

export default OrderStore;