export type User = {
    id: number;
    name: string;
    email: string;
}

export type Order = {
    price?: number;
    quantity: number;
    discount?: number | null;
    transactionId?: number;
    cakeId: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}

export type Transaction = {
    id: number;
    quantity: number;
    customerName: string;
    tax: string | null;
    orderPrice: number | null;
    totalPrice: number | null;
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

export type Ingridient = {
    id: number;
    name: string;
    unit: string;
    pricePerUnit: number;
    expirationDate: string;
    quantity: number;
    supplier: string;
    used? : {
        quantity: number;
        cakeId: number;
        unit: string;
    }
}

export type Cake = {
    id: number;
    name: string;
    profitMargin: string;
    cogs: number;
    sellPrice: number;
    images: string;
    stock: number;
    cakeVariantId: number;
    variant: {
        id: number;
        name: string;
    }
    ingridients: Ingridient[];
}