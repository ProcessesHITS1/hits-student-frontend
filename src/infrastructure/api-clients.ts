import { DefaultApi } from "../api/clients/auth";
import { ChatsApi } from "../api/clients/chats";

export const authApi = new DefaultApi();
export const chatsApi = new ChatsApi();