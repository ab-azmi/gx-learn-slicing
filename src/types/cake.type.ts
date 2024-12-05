export type CakeVariant = {
    id: number;
    name: string;
    price: number;
    cakeId: number;
    cake?: Cake;
}

export type Ingredient = {
    id?: number;
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
    COGS: number;
    sellingPrice: number;
    stockSell: number;
    stockNonSell: number;
    isSell: boolean;
    totalDiscount: number;
    ingredients?: Ingredient[];
    images?: {
        link: string;
        path: string;
        file?: File;
    }[];
    variants?: CakeVariant[];
}

export type CakeFilter = {
    search: string;
    searchIn?: "cakeVariant" | "ingredient" | "discount" | string;
    cakeId?: string;
    orderBy?: string;
    orderType?: string;
    fromCOGS?: string;
    toCOGS?: string;
    fromSellingPrice?: string;
    toSellingPrice?: string;
    fromStockSell?: string;
    toStockSell?: string;
    fromStockNonSell?: string;
    toStockNonSell?: string;
    hasDiscount?: string;
    isSell?: string;
    archived? : string;
};

export type CakeRestock = {
    addStockSell: number;
    addStockNonSell: number;
}