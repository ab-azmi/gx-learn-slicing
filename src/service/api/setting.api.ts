import { API_ENDPOINTS, endpointWrapper } from "@/service/api/config.api";
import { FixedCost, Setting } from "@/types/setting.type";

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

export const updateSetting = (data: Setting) => endpointWrapper(`${API_ENDPOINTS.setting}/${data.id}`, "PUT", data);


export const getFixedCost = (page?: number, filters?: {[key: string]: string}) => {
    const params = new URLSearchParams();

    if (page !== undefined) {
        params.append('page', page.toString());
    }

    if(filters !== undefined) {
        for(const key in filters) {
            if(filters[key] !== '') {
                params.append(key, filters[key]);
            }
        }
    }

    return endpointWrapper(`${API_ENDPOINTS.fixedCost}?${params.toString()}`, "GET");
}

export const getFixedCostById = (id: number) => endpointWrapper(`${API_ENDPOINTS.fixedCost}/${id}`, "GET");

export const createFixedCost = (data: FixedCost) => endpointWrapper(API_ENDPOINTS.fixedCost, "POST", data);

export const updateFixedCost = (data: FixedCost) => endpointWrapper(`${API_ENDPOINTS.fixedCost}/${data.id}`, "PUT", data);

export const deleteFixedCost = (id: number) => endpointWrapper(`${API_ENDPOINTS.fixedCost}/${id}`, 'DELETE');