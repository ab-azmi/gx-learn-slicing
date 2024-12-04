import { transactionForm } from "@/form/transaction.form";
import { Transaction } from "@/types/transaction.type";
import { create } from "zustand";

type Props = {
    transaction: Transaction;
    setTransaction: (transaction: Transaction) => void;
}

const OrderStore = create<Props>((set) => ({
    transaction: transactionForm,
    setTransaction: (transaction) => set({ transaction }),
}));

export default OrderStore;