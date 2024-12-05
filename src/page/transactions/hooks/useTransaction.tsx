import { useEffect, useRef, useState } from "react";
import { Paginate } from "@/types/wraper";
import { toast } from "react-toastify";
import {
  deleteTransaction,
  getTransactions,
} from "@/service/api/transaction.api";
import { Transaction, TransactionFilter } from "@/types/transaction.type";
import { transactionFilterParam, transactionParam } from "@/param/transaction.param";

const useTransaction = () => {

  const [transactions, setTransactions] = useState<Paginate<Transaction>>();
  const backupTransactions = useRef<Paginate<Transaction>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<TransactionFilter>(transactionFilterParam);
  const [input, setInput] = useState<Transaction>(transactionParam);

  useEffect(() => {
    setLoading(true);

    getTransactions().then((res) => {
      setTransactions(res);
      backupTransactions.current = res;
      setLoading(false);
    });
  }, []);

  const handleDelete = (item: Transaction) => {
    const id = toast.loading("Deleting...");
   
    deleteTransaction(item.id!)
      .then(() => {
        toast.update(id, {
          render: "Deleted",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  const clearFilter = () => {
    setFilters(transactionFilterParam);
    setTransactions(backupTransactions.current);
  };

  const refetchTransaction = (page?: number) => {
    setLoading(true);
    getTransactions(page, filters).then((res) => {
      setTransactions(res);
      setLoading(false);
    });
  };

  const clearInput = () => {
    setInput(transactionParam);
  };

  return {
    transactions,
    setTransactions,
    input,
    loading,
    filters,
    showModal,
    setShowModal,
    setInput,
    setFilters,
    handleDelete,
    refetchTransaction,
    clearFilter,
    clearInput,
  };
};

export default useTransaction;
