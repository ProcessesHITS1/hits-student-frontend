import { useEffect } from "react"

export const useAsyncEffect = (asyncFunc: () => Promise<void>, deps: any[]) => {
    useEffect(() => {
        (async () => await asyncFunc())();
    }, [asyncFunc, ...deps]);
}