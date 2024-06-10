import { useState } from "react"
import { useAsyncEffect } from "./use-async-effect";
import { AxiosResponse } from "axios";

type FetchStatus<T> = {
    isLoading: boolean;
    data?: Required<T>
};

export const useFetchRequestData = <T>(
    request: () => Promise<AxiosResponse<T, any>>
): FetchStatus<T> => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Required<T> | undefined>();

    useAsyncEffect(async () => {
        setIsLoading(true);
        const response = await request();
        setIsLoading(false);

        if (!response.data) return;

        const obj = {} as any;
        for (const [key, value] of Object.entries(response.data)) {
            obj[key] = value;
        }

        setData(obj as Required<T>);

    }, [setData, setIsLoading]);

    return { isLoading, data }
}