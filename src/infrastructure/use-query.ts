import { useCallback, useState } from "react"
import { useAsyncEffect } from "./use-async-effect";
import { AxiosResponse } from "axios";

type Request<TParams, TResult> = (params: TParams) => Promise<AxiosResponse<TResult, any>>;

export type DeepRequired<T> = {
    [K in keyof T]: Required<DeepRequired<T[K]>>
};

export type QueryProperties<TParams, TResult> = {
    isLoading: boolean;
    data?: DeepRequired<TResult>;
    refetch: (params?: TParams) => Promise<void>;
};

export function useQuery<TResult>(
    request: Request<undefined, TResult>,
    executeImmediately?: boolean
): QueryProperties<undefined, TResult>;

export function useQuery<TParams, TResult>(
    request: Request<TParams, TResult>,
    defaultParams: TParams,
    executeImmediately?: boolean
): QueryProperties<TParams, TResult>;

export function useQuery<TParams, TResult>(
    request: Request<TParams | undefined, TResult>,
    defaultParams?: TParams,
    executeImmediately?: boolean
): QueryProperties<TParams, TResult>;

export function useQuery<TParams, TResult>(
    request: Request<TParams | undefined, TResult>,
    defaultParams?: TParams,
    executeImmediately: boolean = true,
): QueryProperties<TParams, TResult> {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<DeepRequired<TResult> | undefined>();

    const refetch = useCallback(
        async (params?: TParams) => {
            setIsLoading(true);
            const response = await request(params ?? defaultParams);
            console.log(response);
            setIsLoading(false);

            if (!response.data) return;

            setData(requirify(response.data));
        },
        [setData, setIsLoading, defaultParams]
    );

    useAsyncEffect(async () => {
        if (executeImmediately) {
            await refetch(defaultParams);
        }
    }, []);

    return { isLoading, data, refetch }
}

function requirify<T extends object>(target: T): DeepRequired<T>;
function requirify<T extends object>(target: T[]): DeepRequired<T>[];
function requirify<T extends object>(target: T | T[]): DeepRequired<T> | DeepRequired<T>[] {
    if (target === null) {
        return target as DeepRequired<T>;
    }

    if (Array.isArray(target)) {
        return target.map(t => requirify(t));
    }

    if (typeof target === 'object') {
        const obj = {} as any;

        for (const [key, value] of Object.entries(target)) {
            if (typeof value === 'object') {
                obj[key] = requirify(value);
                continue;
            }
    
            if (Array.isArray(value)) {
                const arr = [] as typeof value;
                value.forEach(v => arr.push(requirify(v)));
                obj[key] = arr;
                continue;
            }
    
            obj[key] = value;
        }

        return obj;
    }

    return target as DeepRequired<T>;
}