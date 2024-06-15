import { useCallback, useState } from "react"
import { useAsyncEffect } from "./use-async-effect";
import { AxiosResponse } from "axios";

type Request<TParams, TResult> = (params: TParams) => Promise<AxiosResponse<TResult, any>>;

export type QueryProperties<TParams, TResult> = {
    isLoading: boolean;
    data?: Required<TResult>;
    refetch: (params?: TParams) => Promise<void>;
};

export function useQuery<TResult>(
    request: Request<undefined, TResult>
): QueryProperties<undefined, TResult>;

export function useQuery<TParams, TResult>(
    request: Request<TParams, TResult>,
    defaultParams: TParams
): QueryProperties<TParams, TResult>;

export function useQuery<TParams, TResult>(
    request: Request<TParams | undefined, TResult>,
    defaultParams?: TParams
): QueryProperties<TParams, TResult>;

export function useQuery<TParams, TResult>(
    request: Request<TParams | undefined, TResult>,
    defaultParams?: TParams
): QueryProperties<TParams, TResult> {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Required<TResult> | undefined>();

    const refetch = useCallback(
        async (params?: TParams) => {
            setIsLoading(true);
            const response = await request(params ?? defaultParams);
            setIsLoading(false);

            if (!response.data) return;

            const obj = {} as any;
            for (const [key, value] of Object.entries(response.data)) {
                obj[key] = value;
            }

            setData(obj as Required<TResult>);
        },
        [setData, setIsLoading, defaultParams]
    );

    useAsyncEffect(() => refetch(defaultParams), []);

    return { isLoading, data, refetch }
}