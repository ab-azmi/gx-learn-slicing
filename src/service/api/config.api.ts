import AuthStore from "@/store/AuthStore";
import { Lead } from "@/types/leads";

export const API_URL = import.meta.env.VITE_BE_URL;

const getToken = () => {
    return AuthStore.getState().token;
}

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "",
};

export const getHeaders = () => {
    return {
        ...headers,
        "Authorization": `Bearer ${getToken()}`,
    }
}

export const API_ENDPOINTS = {
    login: `${API_URL}/login`,
    logout: `${API_URL}/auth/logout`,
    lead: `${API_URL}/leads`,
    probability: `${API_URL}/probabilities`,
};


export const endpointWrapper = async (endpoint: string, method: string, data?: Lead) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
  
        throw new Error(`Failed request: ${response.statusText}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  }