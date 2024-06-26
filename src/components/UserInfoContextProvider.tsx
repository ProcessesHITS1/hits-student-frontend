import { FC, PropsWithChildren, createContext } from "react"
import { UserInfoDto } from "../api/clients/auth"
import { useQuery } from "../infrastructure/use-query";
import { authApi } from "../infrastructure/api-clients";

export const UserInfoContext = createContext<UserInfoDto | undefined>(undefined);

export const UserInfoContextProvider: FC<PropsWithChildren> = props => {
    const { data: userInfo } = useQuery(
        () => authApi.getAuthenticatedUserInfo()  
    );

    return (
        <UserInfoContext.Provider value={userInfo}>
            {props.children}
        </UserInfoContext.Provider>
    )
}