import { CakeVariant } from "./cake.type";

export type User = {
    id: number;
    name: string;
    email: string;
    employeeId?: number;
}

export type Employee = {
    id: number;
    name: string;
    address: string;
    phone: string;
    bankNumber: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export type Order = {
    id?: number;
    totalPrice?: number;
    price?: number;
    quantity: number;
    discount?: number | null;
    transactionId?: number;
    cakeVariantId: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    cakeVariant?: CakeVariant;
}

export type Transaction = {
    id?: number;
    status: {
        id: number;
        name: string;
    };
    quantity: number;
    number: string;
    tax: number;
    orderPrice: number ;
    totalPrice: number ;
    totalDiscount: number;
    employeeId?: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    employee?: Employee,
    orders: Order[]
}

export type TransactionFilter = {
    search?: string;
    searchIn?: "employee" | "cakeVariant" | "number" | string;
    statusId?: string;
    orderBy?: string;
    orderType?: string;
    fromDate?: string;
    toDate?: string;
    fromTotalPrice?: string;
    toTotalPrice?: string;
    fromOrderPrice?: string;
    toOrderPrice?: string;
    fromQuantity?: string;
    toQuantity?: string;
    employeeId?: string;
}