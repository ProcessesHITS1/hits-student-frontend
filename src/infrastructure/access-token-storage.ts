const accessTokenKey = "access-token";

export const storeAccessToken = (token: string) => localStorage.setItem(accessTokenKey, token);

export const getAccessToken = () => localStorage.getItem(accessTokenKey);