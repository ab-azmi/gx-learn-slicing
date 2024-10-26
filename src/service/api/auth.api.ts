import { API_ENDPOINTS } from "@/service/api/config.api";

type credentials = {
    email: string;
    password: string;
    password_confirmation?: string;
}

export const login = async (data: credentials) => {
    return await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) =>{
        if(res.ok){
            return res.json();
        }
        throw new Error("Login failed");
    })
}

export const logout = async () => {
    return await fetch(API_ENDPOINTS.logout, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
}