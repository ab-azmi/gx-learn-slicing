import { API_ENDPOINTS } from "@/service/api/config.api";

export const login = async () => {
    const response = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "",
            password: "",
        }),
    });

    return response.json();
}

export const logout = async () => {
    const response = await fetch(API_ENDPOINTS.logout, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}