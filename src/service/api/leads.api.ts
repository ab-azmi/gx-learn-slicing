import { API_ENDPOINTS, getHeaders } from "@/service/api/config.api";
import { Lead } from "@/types/leads";

export const getLeads = async () => {
  const response = await fetch(API_ENDPOINTS.lead, {
    method: "GET",
    headers: getHeaders(),
  });
  return response.json();
};

export const getLead = async (id: number) => {
  const response = await fetch(`${API_ENDPOINTS.lead}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return response.json();
};

export const createLead = async (data: Lead) => {
  return await fetch(`${API_ENDPOINTS.lead}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  .then((res) => {
    if(res.ok){
        return res.json();
    }

    throw new Error("Create failed");
  });
};

export const updateLead = async (data: Lead) => {
  return await fetch(`${API_ENDPOINTS.lead}/${data.id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  .then((res) => {
    if(res.ok){
        return res.json();
    }

    throw new Error("Update failed");
  });
};

export const deleteLead = async (id: number) => {
  return await fetch(`${API_ENDPOINTS.lead}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then((res) => {
    if(res.ok){
        return res.json();
    }

    throw new Error("Delete failed");
  });
};

export const getProbabilities = async () => {
  return await fetch(API_ENDPOINTS.probability, {
    method: "GET",
    headers: getHeaders(),
  }).then((res) => {
    if(res.ok){
        return res.json();
    }

    throw new Error("Failed to fetch probabilities");
  })
};