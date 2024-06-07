import { AxiosResponse, HttpStatusCode } from "axios";
import { router } from "../router";

export const refreshTokenInterceptor = (response: AxiosResponse) => {
    if (
        response.status === HttpStatusCode.Unauthorized
        || response.status === HttpStatusCode.Forbidden
    ) {
        router.navigate("/login");
    }

    return response;
}