import { API_ENDPOINTS, endpointWrapper } from "@/service/api/config.api";
import { Transaction } from "@/types/transaction";

export const getTransactions = (
    page?: number,
    filters?: { [key: string]: string }
) => {
    const params = new URLSearchParams();
    if (page !== undefined) params.append('page', page.toString());
    if (filters !== undefined) {
        for (const key in filters) {
            if (filters[key] !== '') {
                params.append(key, filters[key]);
            }
        }
    }
    return endpointWrapper(`${API_ENDPOINTS.transaction}?${params.toString()}`, "GET");
};

export const getTransaction = (id: number) => endpointWrapper(`${API_ENDPOINTS.transaction}/${id}`, "GET");

export const createTransaction = (data: Transaction) => endpointWrapper(API_ENDPOINTS.transaction, "POST", data);

export const updateTransaction = (data: Transaction) => endpointWrapper(`${API_ENDPOINTS.transaction}/${data.id}`, "PATCH", data);

export const deleteTransaction = (id: number) => endpointWrapper(`${API_ENDPOINTS.transaction}/${id}`, "DELETE");
