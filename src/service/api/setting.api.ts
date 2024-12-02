import { API_ENDPOINTS, endpointWrapper } from "@/service/api/config.api";

export const getSettings = (filters?: {[key: string]: string}) => {
    const params = new URLSearchParams();
    if(filters !== undefined) {
        for(const key in filters) {
            if(filters[key] !== '') {
                params.append(key, filters[key]);
            }
        }
    }

    return endpointWrapper(`${API_ENDPOINTS.setting}?${params.toString()}`, "GET");
}