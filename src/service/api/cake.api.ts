import { Cake } from "@/types/transaction";
import { API_ENDPOINTS, endpointWrapper } from "./config.api";

export const getCakes = (
    page?: number,
    search?: string,
    filters?: { [key: string]: string }
) => {
    const params = new URLSearchParams();
    if (page !== undefined) params.append('page', page.toString());
    if (search !== undefined) params.append('search', search);
    if (filters !== undefined) {
        for (const key in filters) {
            params.append(key, filters[key]);
        }
    }
    return endpointWrapper(`${API_ENDPOINTS.cake}?${params.toString()}`, "GET");
};

export const createCake = (data: Cake) => endpointWrapper(API_ENDPOINTS.cake, "POST", data);

export const updateCake = (data: Cake) => endpointWrapper(`${API_ENDPOINTS.cake}/${data.id}`, "PATCH", data);

export const deleteCake = (id: number) => endpointWrapper(`${API_ENDPOINTS.cake}/${id}`, "DELETE");


export const getVariants = () => endpointWrapper(API_ENDPOINTS.variant, "GET");


export const getIngridients = () => endpointWrapper(API_ENDPOINTS.ingidient, "GET");

export const calculateCOGS = (data: {
    volume: number;
    margin: string;
    ingridients: {
        id: number;
        quantity: number;
    }[];
}) => endpointWrapper(`${API_ENDPOINTS.cake}/cogs`, "POST", data);