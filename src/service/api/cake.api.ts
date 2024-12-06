import { Cake, CakeFilter, CakeRestock, Ingredient } from "@/types/cake.type";
import { API_ENDPOINTS, endpointWrapper } from "./config.api";

export const getCakes = (
    page?: number,
    filters?: CakeFilter
) => {
    const params = new URLSearchParams();
    if (page !== undefined) params.append('page', page.toString());
    if (filters !== undefined) {
        for (const key in filters) {
            if (filters[key as keyof CakeFilter] !== '') {
                params.append(key, filters[key as keyof CakeFilter] as string);
            }
        }
    }
    return endpointWrapper(`${API_ENDPOINTS.cake}?${params.toString()}`, "GET");
};

export const getCake = (id: number) => endpointWrapper(`${API_ENDPOINTS.cake}/${id}`, "GET");

export const createCake = (data: Cake) => endpointWrapper(API_ENDPOINTS.cake, "POST", data);

export const updateCake = (data: Cake) => endpointWrapper(`${API_ENDPOINTS.cake}/${data.id}`, "PUT", data);

export const deleteCake = (id: number) => endpointWrapper(`${API_ENDPOINTS.cake}/${id}`, "DELETE");

export const restockCake = (id: number, data: CakeRestock) => endpointWrapper(`${API_ENDPOINTS.cake}/restock/${id}`, "POST", data);


export const getVariants = (filters?: { [key: string]: string }) => {
    const params = new URLSearchParams();
    if (filters !== undefined) {
        for (const key in filters) {
            if (filters[key] !== '') {
                params.append(key, filters[key]);
            }
        }
    }

    return endpointWrapper(`${API_ENDPOINTS.variant}?${params.toString()}`, "GET");
};


export const getIngredients = () => endpointWrapper(API_ENDPOINTS.ingidient, "GET");

export const calculateCOGS = (data: {
    margin?: number;
    ingredients: Ingredient[];
}) => endpointWrapper(`${API_ENDPOINTS.cake}/cogs`, "POST", data);