const accessTokenKey = "access-token";

export const forgetAccessToken = () => localStorage.removeItem(accessTokenKey);

export const storeAccessToken = (token: string) => localStorage.setItem(accessTokenKey, token);

export const getAccessToken = () => localStorage.getItem(accessTokenKey);