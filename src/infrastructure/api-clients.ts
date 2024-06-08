import { DefaultApi as AuthApi } from "../api/clients/auth";
import { ChatsApi } from "../api/clients/chats";
import { PositionsApi, RequestApi, SeasonsApi } from "../api/clients/interview";
import { DefaultApi as CompaniesApi } from "../api/clients/companies";

export const authApi = new AuthApi();
export const chatsApi = new ChatsApi();
export const seasonsApi = new SeasonsApi();
export const companiesApi = new CompaniesApi();
export const positionsApi = new PositionsApi();
export const requestApi = new RequestApi();