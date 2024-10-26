import { API_ENDPOINTS } from "@/service/api/config.api";
import { Leads } from "@/types/leads";

const headers = {
    "Content-Type": "application/json",
    "Authorization": "",
};

export const setTokenHeader = (token: string) => {
    headers["Authorization"] = `Bearer ${token}`;
};

export const getLeads = async () => {
  const response = await fetch(API_ENDPOINTS.lead, {
    method: "GET",
    headers: headers,
  });
  return response.json();
};

export const getLead = async (id: number) => {
  const response = await fetch(`${API_ENDPOINTS.lead}/${id}`, {
    method: "GET",
    headers: headers,
  });
  return response.json();
};

export const createLead = async (data: Leads) => {
  const response = await fetch(API_ENDPOINTS.lead, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateLead = async (data: Leads) => {
  const response = await fetch(`${API_ENDPOINTS.lead}/${data.id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteLead = async (id: number) => {
  const response = await fetch(`${API_ENDPOINTS.lead}/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  return response.json();
};