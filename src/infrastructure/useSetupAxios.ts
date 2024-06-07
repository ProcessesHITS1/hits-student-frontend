import axios from "axios";
import { accessTokenInterceptor } from "./interceptors/access-token-interceptor";
import { refreshTokenInterceptor } from "./interceptors/refresh-token-interceptor";
import { useEffect } from "react";

export const useSetupAxios = () => {
    useEffect(() => {
        const instance = axios;
        
        instance.defaults.validateStatus = () => true;

        instance.interceptors.request.use(accessTokenInterceptor);
        instance.interceptors.response.use(refreshTokenInterceptor)
    }, [])
}