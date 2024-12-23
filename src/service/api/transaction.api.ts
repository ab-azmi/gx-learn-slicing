import { API_ENDPOINTS, endpointWrapper } from "@/service/api/config.api";
import { Transaction } from "@/types/transaction.type";

export const getTransactions = (
    page?: number,
    filters?: { [key: string]: string }
) => {
    let params = '';

    if (page !== undefined) {
        params += `page=${page}&`;
    }

    if (filters !== undefined) {
        for (const key in filters) {
            if (filters[key] !== '') {
                if (key === 'fromDate' || key === 'toDate') {
                    params += `${key}=${filters[key]}&`;
                } else {
                    params += `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}&`;
                }
            }
        }
    }
    
    if (params.endsWith('&')) {
        params = params.slice(0, -1);
    }

    return endpointWrapper(`${API_ENDPOINTS.transaction}?${params}`, "GET");
};

export const getTransaction = (id: number) => endpointWrapper(`${API_ENDPOINTS.transaction}/${id}`, "GET");

export const getTransactionSummary = () => endpointWrapper(`${API_ENDPOINTS.transaction}/monthly-summary`, "GET");

export const createTransaction = (data: Transaction) => endpointWrapper(API_ENDPOINTS.transaction, "POST", data);

export const updateTransaction = (data: Transaction) => endpointWrapper(`${API_ENDPOINTS.transaction}/${data.id}`, "PATCH", data);

export const deleteTransaction = (id: number) => endpointWrapper(`${API_ENDPOINTS.transaction}/${id}`, "DELETE");
