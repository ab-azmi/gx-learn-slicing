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
    'search': string;
    'cakeId'?: string;
    'orderBy'?: string;
    'orderType'?: string;
};