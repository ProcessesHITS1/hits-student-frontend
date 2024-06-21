import { getAccessToken } from "./access-token-storage";
// @ts-ignore
import decode from 'jwt-claims';

type Claims = {
    id: string;
}

export const getUserClaims = (): Claims | undefined => {
    const token = getAccessToken();

    if (!token) return undefined;

    return decode(token) as Claims;
}