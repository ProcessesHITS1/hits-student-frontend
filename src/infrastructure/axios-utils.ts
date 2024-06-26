import { AxiosResponse } from "axios";

export const getContentDisposition = (response: AxiosResponse<unknown, unknown>) => {
    const header = response.headers['content-disposition'];
    if (!header) return undefined;

    const filename = (header as string).split(";")[1].trim().split("filename=")[1];
    return filename.slice(1, -1);
}