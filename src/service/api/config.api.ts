export const API_URL = process.env.BE_URL;

export const API_ENDPOINTS = {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    logout: `${API_URL}/auth/logout`,
    lead: `${API_URL}/leads`,
    };