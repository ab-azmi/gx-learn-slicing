import { API_ENDPOINTS, endpointWrapper } from "@/service/api/config.api";

type credentials = {
    email: string;
    password: string;
    password_confirmation?: string;
}

export const login = (data:credentials) => endpointWrapper(API_ENDPOINTS.login, "POST", data);

export const logout = () => endpointWrapper(API_ENDPOINTS.logout, "POST");