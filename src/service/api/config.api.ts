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
    login: `${API_URL}/login`,
    logout: `${API_URL}/auth/logout`,
    lead: `${API_URL}/leads`,
    probability: `${API_URL}/probabilities`,
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const endpointWrapper = async (endpoint: string, method: string, data?:any) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 401) throw new Error("Invalid token or token expired");
        throw new Error("An error occured");
      }
      
    } catch (error) {
      console.error("Error: ", error);
      alert(error);
    }
  }