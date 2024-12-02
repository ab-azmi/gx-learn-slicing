export type User = {
    id: number;
    name: string;
    email: string;
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
    quantity: number;
    number: string;
    tax: string | null;
    orderPrice: number | null;
    totalPrice: number | null;
    totalDiscount: number | null;
    employeeId?: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    employee?: Employee,
    orders: Order[]
}

export type CakeVariant = {
    id: number;
    name: string;
    price: number;
    cakeId: number;
    cake?: Cake;
}

export type Ingredient = {
    id: number;
    name?: string;
    unit?: {
        id: number;
        name: string;
    };
    price?: number;
    expirationDate?: string;
    quantity: number;
    supplier?: string;
    pivot? : {
        quantity: number;
    }
}

export type Cake = {
    id?: number;
    name: string;
    profitMargin: number;
    cogs: number;
    sellingPrice: number;
    images: string;
    stock: number;
    ingridients?: Ingredient[];
}