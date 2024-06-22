import { FC, PropsWithChildren, createContext } from "react";
import { Season } from "../api/clients/interview";
import { useQuery } from "../infrastructure/use-query";
import { seasonsApi } from "../infrastructure/api-clients";

export const SeasonContext = createContext<Season | undefined>(undefined);

export const SeasonContextProvider: FC<PropsWithChildren> = props => {

    const { data: season } = useQuery(
        () => seasonsApi.apiSeasonMyCurrentGet()  
    );

    return (
        <SeasonContext.Provider value={season}>
            {props.children}
        </SeasonContext.Provider>
    );
}