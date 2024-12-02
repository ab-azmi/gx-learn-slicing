/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthStore from "@/store/AuthStore";

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
  cake: `${API_URL}`,
  lead: `${API_URL}/leads`,
  variant: `${API_URL}/variants`,
  setting: `${API_URL}/settings`,
  login: `${API_URL}/auth/login`,
  logout: `${API_URL}/auth/logout`,
  transaction: `${API_URL}/transactions`,
  probability: `${API_URL}/probabilities`,
  ingidient: `${API_URL}/components/ingredients`,
};


export const endpointWrapper = async (
  endpoint: string,
  method: string,
  data?: any,
) => {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 401) {
        history.pushState({}, "", "/auth/login");
        window.location.reload();
        
        throw new Error("Unauthorized");

      }
      throw new Error("An error occured");
    }

  } catch (error) {
    console.error("Error: ", error);
    alert(error);
  }
}