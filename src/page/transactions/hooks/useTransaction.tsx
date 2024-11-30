import { useEffect, useRef, useState } from "react";
import useLogout from "@/hooks/useLogout";
import { Paginate } from "@/types/wraper";
import { toast } from "react-toastify";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/service/api/transaction.api";
import { CakeVariant, Transaction } from "@/types/transaction";
import AuthStore from "@/store/AuthStore";
import { getVariants } from "@/service/api/cake.api";
import { transactionForm } from "@/form/transaction.form";

const useTransaction = () => {
  const store = AuthStore();
  const { signout } = useLogout();

  const [transactions, setTransactions] = useState<Paginate<Transaction>>();
  const backupTransactions = useRef<Paginate<Transaction>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [input, setInput] = useState<Transaction>(transactionForm);
  const [cakeVariants, setCakeVariants] = useState<CakeVariant[]>([]);

  useEffect(() => {
    setLoading(true);

    getTransactions().then((res) => {
      setTransactions(res);
      backupTransactions.current = res;
      setLoading(false);
    });

    setInput((prev) => ({
      ...prev,
      cashierId: store.user?.id || 0,
    }));
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

  const handleCreate = () => {
    const id = toast.loading("Creating...");
    setLoading(true);
    
    createTransaction(input).then((res) => {
      setLoading(false);
      // setInput(transactionForm);
      setInput((prev) => ({
        ...prev,
        orderPrice: res.result.orderPrice,
        totalPrice: res.result.totalPrice,
        totalDiscount: res.result.totalDiscount,
        tax: res.result.tax,
      }));
      
      toast.update(id, {
        render: "Created",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      getVariants().then((res) => {
        setCakeVariants(res.result);
      });
    });
  };

  const handleUpdate = () => {
    const id = toast.loading("Updating...");
    setLoading(true);

    updateTransaction(input).then(() => {
      setLoading(false);
      toast.update(id, {
        render: "Updated",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleFilter = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilter = () => {
    setFilters({});
    // setTransactions(backupTransactions.current);
  };

  const refetchTransaction = (page?: number) => {
    setLoading(true);
    getTransactions(page, search, filters).then((res) => {
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
    showModal,
    setShowModal,
    search,
    setSearch,
    cakeVariants,
    setInput,
    handleSelect,
    handleDelete,
    handleFilter,
    refetchTransaction,
    clearFilter,
    handleCreate,
    clearInput,
    handleUpdate
  };
};

export default useTransaction;
