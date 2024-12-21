import { Transaction, TransactionFilter } from "@/types/transaction.type";

export const transactionParam: Transaction = {
    id: 0,
    status: {
      id: 0,
      name: "",
    },
    quantity: 0,
    number: "",
    tax: 0,
    orderPrice: 0,
    totalPrice: 0,
    totalDiscount: 0,
    employeeId: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    orders: [],
  };

  export const transactionFilterParam: TransactionFilter = {
    search: "",
    searchIn: "",
    statusId: "",
    orderBy: "",
    orderType: "",
    fromDate: "",
    toDate: "",
    fromTotalPrice: "",
    toTotalPrice: "",
    fromOrderPrice: "",
    toOrderPrice: "",
    fromQuantity: "",
    toQuantity: "",
    employeeId: "",
  }