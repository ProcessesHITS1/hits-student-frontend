import { DefaultApi as AuthApi } from "../api/clients/auth";
import { ChatsApi } from "../api/clients/chats";
import { PositionsApi, RequestApi, RequestStatusTemplatesApi, SeasonsApi } from "../api/clients/interview";
import { DefaultApi as CompaniesApi } from "../api/clients/companies";
import { DefaultApi as ThirdCourseApi } from "../api/clients/internship";

export const authApi = new AuthApi();
export const chatsApi = new ChatsApi();
export const seasonsApi = new SeasonsApi();
export const companiesApi = new CompaniesApi();
export const positionsApi = new PositionsApi();
export const requestApi = new RequestApi();
export const templatesApi = new RequestStatusTemplatesApi();
export const thirdCourseApi = new ThirdCourseApi();