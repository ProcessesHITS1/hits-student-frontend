const USER_ID_KEY = "user-id";

export const getCurrentUserId = () => localStorage.getItem(USER_ID_KEY);
export const setCurrentUserId = (value: string) => localStorage.setItem(USER_ID_KEY, value);