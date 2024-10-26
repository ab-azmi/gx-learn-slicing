import { API_ENDPOINTS } from "@/service/api/config.api";

type Leads = {
    id?: number;
    code: string;
    name: string;
    branch: string;
}

export const getLeads = async () => {
  const response = await fetch(API_ENDPOINTS.lead, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getLead = async (id: number) => {
  const response = await fetch(`${API_ENDPOINTS.lead}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const createLead = async (data: Leads) => {
  const response = await fetch(API_ENDPOINTS.lead, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateLead = async (data: Leads) => {
  const response = await fetch(`${API_ENDPOINTS.lead}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteLead = async (id: number) => {
  const response = await fetch(`${API_ENDPOINTS.lead}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};