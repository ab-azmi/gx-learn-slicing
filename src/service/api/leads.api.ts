import { API_ENDPOINTS, endpointWrapper } from "@/service/api/config.api";
import { Lead } from "@/types/leads";

export const getLeads = (
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
    return endpointWrapper(`${API_ENDPOINTS.lead}?${params.toString()}`, "GET");
};

export const createLead = (data: Lead) => endpointWrapper(API_ENDPOINTS.lead, "POST", data);

export const updateLead = (data: Lead) => endpointWrapper(`${API_ENDPOINTS.lead}/${data.id}`, "PATCH", data);

export const deleteLead = (id: number) => endpointWrapper(`${API_ENDPOINTS.lead}/${id}`, "DELETE");

export const getProbabilities = () => endpointWrapper(API_ENDPOINTS.probability, "GET");