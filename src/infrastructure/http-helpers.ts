import { AxiosResponse } from "axios";

export const isRequestSuccessful = <T>(response: AxiosResponse<T, any>) =>
    response.status >= 200 && response.status <= 299;