import { API_ENDPOINTS, endpointWrapper } from "@/service/api/config.api";
import { Lead } from "@/types/leads";

export const getLeads = () => endpointWrapper(API_ENDPOINTS.lead, "GET");

export const createLead = (data: Lead) => endpointWrapper(API_ENDPOINTS.lead, "POST", data);

export const updateLead = (data: Lead) => endpointWrapper(`${API_ENDPOINTS.lead}/${data.id}`, "PATCH", data);

export const deleteLead = (id: number) => endpointWrapper(`${API_ENDPOINTS.lead}/${id}`, "DELETE");

export const getProbabilities = () => endpointWrapper(API_ENDPOINTS.probability, "GET");