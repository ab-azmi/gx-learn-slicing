import { API_ENDPOINTS, endpointWrapper } from "@/service/api/config.api";
import { Transaction } from "@/types/transaction";

export const getTransactions = (
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
    return endpointWrapper(`${API_ENDPOINTS.transaction}?${params.toString()}`, "GET");
};

export const createTransaction = (data: Transaction) => endpointWrapper(API_ENDPOINTS.transaction, "POST", data);

export const updateTransaction = (data: Transaction) => endpointWrapper(`${API_ENDPOINTS.transaction}/${data.id}`, "PATCH", data);

export const deleteTransaction = (id: number) => endpointWrapper(`${API_ENDPOINTS.transaction}/${id}`, "DELETE");
