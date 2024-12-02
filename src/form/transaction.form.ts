import { Transaction } from "@/types/transaction";

export const transactionForm: Transaction = {
    id: 0,
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

  export const cakeVariantFilterForm = {
    'search': '',
    'cakeId': '',
    'orderBy': '',
    'orderType': '',
};