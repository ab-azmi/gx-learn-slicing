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