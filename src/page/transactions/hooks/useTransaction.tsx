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

const formInitial = {
  id: 0,
  quantity: 0,
  number: "",
  tax: "",
  orderPrice: null,
  totalPrice: null,
  totalDiscount: null,
  employeeId: 0,
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  cakeVariantId: 0,
  orders: [],
};

const useTransaction = () => {
  const store = AuthStore();
  const { signout } = useLogout();

  const [transactions, setTransactions] = useState<Paginate<Transaction>>();
  const backupTransactions = useRef<Paginate<Transaction>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [input, setInput] = useState<Transaction>(formInitial);
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

    getVariants().then((res) => {
      setCakeVariants(res.result);
    });
  }, []);

  const handleDelete = (item: Transaction) => {
    // setFilteredLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
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
      // setInput(formInitial);
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleOrderChange = (
    variant: CakeVariant, 
    quantity: number
  ) => {;
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
        cakeVariant: variant,
        price: price,
        totalPrice: price * quantity,
        quantity: quantity,
      });
    }

    setInput({
      ...input,
      orders: newOrders,
    });
    console.log(newOrders);
  };

  const handleFilter = (name: string, value: string) => {
    //add filter to filters state
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilter = () => {
    setFilters({});
    setTransactions(backupTransactions.current);
  };

  const refetchLeads = (page?: number) => {
    setLoading(true);
    getTransactions(page, search, filters).then((res) => {
      setTransactions(res);
      setLoading(false);
    });
  };

  const clearInput = () => {
    setInput(formInitial);
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
    handleInput,
    handleFilter,
    refetchLeads,
    clearFilter,
    handleCreate,
    clearInput,
    handleUpdate,
    handleOrderChange,
  };
};

export default useTransaction;
