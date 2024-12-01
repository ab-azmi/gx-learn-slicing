import { useEffect, useRef, useState } from "react";
import useLogout from "@/hooks/useLogout";
import { Paginate } from "@/types/wraper";
import { toast } from "react-toastify";
import {
  deleteTransaction,
  getTransactions,
} from "@/service/api/transaction.api";
import { Transaction } from "@/types/transaction";
import { transactionForm } from "@/form/transaction.form";

const useTransaction = () => {
  const { signout } = useLogout();

  const [transactions, setTransactions] = useState<Paginate<Transaction>>();
  const backupTransactions = useRef<Paginate<Transaction>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    search: "",
    fromDate: "",
    toDate: "",
  });
  const [input, setInput] = useState<Transaction>(transactionForm);

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
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          alert("Unauthorized");
          signout();
          return;
        }

        toast.update(id, {
          render: "Failed to delete",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  const clearFilter = () => {
    setFilters({});
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
    setInput(transactionForm);
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
