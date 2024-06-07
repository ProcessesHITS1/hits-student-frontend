import { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../../infrastructure/access-token-storage";

export const accessTokenInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = getAccessToken();
    
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
}