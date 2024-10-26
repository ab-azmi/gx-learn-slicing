
export const API_URL = import.meta.env.VITE_BE_URL;

export const API_ENDPOINTS = {
    login: `${API_URL}/login`,
    logout: `${API_URL}/auth/logout`,
    lead: `${API_URL}/leads`,
    };