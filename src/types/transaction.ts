export type Order = {
    price: number;
    quantity: number;
    discount: number | null;
    transactionId: number;
    cakeId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export type Transaction = {
    id: number;
    quantity: number;
    customerName: string;
    tax: string;
    orderPrice: number;
    totalPrice: number;
    totalDiscount: number | null;
    cashierId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    cashier: {
        id: number;
        name: string;
        email: string;
    },
    orders: Order[]
}