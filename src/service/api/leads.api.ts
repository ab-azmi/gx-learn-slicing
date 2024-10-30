import { API_ENDPOINTS, getHeaders } from "@/service/api/config.api";
import { Lead } from "@/types/leads";

export const getLeads = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.lead, {
      method: "GET",
      headers: getHeaders(),
    });

    if(!response.ok) {
      throw new Error(`Failed to fetch leads: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching leads", error);
    throw error;
  }
};

export const getLead = async (id: number) => {
  const response = await fetch(`${API_ENDPOINTS.lead}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return response.json();
};

export const createLead = async (data: Lead) => {
  try{
    const response = await fetch(`${API_ENDPOINTS.lead}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if(!response.ok) {
      throw new Error(`Failed to create lead: ${response.statusText}`);
    }

    return response.json();
  }catch(error) {
    console.error("Error creating lead", error);
    throw error;
  }
};

export const updateLead = async (data: Lead) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.lead}/${data.id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if(!response.ok) {
      throw new Error(`Failed to update lead: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error updating lead", error);
    throw error;
  }
};

export const deleteLead = async (id: number) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.lead}/${id}`, {
      method: "DELETE",
      headers: {"Accept": "application/json"},
    });

    if(!response.ok) {
      throw new Error(`Failed to delete lead: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting lead", error);
    throw error;
  }
};

export const getProbabilities = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.probability, {
      method: "GET",
      headers: getHeaders(),
    });

    if(!response.ok) {
      throw new Error(`Failed to fetch probabilities: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching probabilities", error);
    throw error;
  }
};