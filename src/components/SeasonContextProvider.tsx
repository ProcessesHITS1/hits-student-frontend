import { FC, PropsWithChildren, createContext, useEffect } from "react";
import { RequestStatusTemplateData, Season } from "../api/clients/interview";
import { DeepRequired, useQuery } from "../infrastructure/use-query";
import { seasonsApi, templatesApi } from "../infrastructure/api-clients";

type SeasonInfo = {
    season?: DeepRequired<Season>;
    statusTemplates?: DeepRequired<RequestStatusTemplateData>[];
}

export const SeasonContext = createContext<SeasonInfo>({});

export const SeasonContextProvider: FC<PropsWithChildren> = props => {

    const { data: season } = useQuery(
        () => seasonsApi.apiSeasonMyCurrentGet()  
    );

    const { data: statusTemplates, refetch } = useQuery<{ year: number }, RequestStatusTemplateData[]>(
        params => templatesApi.seasonYearRequestStatusesGet(params.year),
        { year: 2020 },
        false
    );

    useEffect(() => {
        if (!season?.year) return;
        refetch({ year: season.year });
    }, [season]);

    return (
        <SeasonContext.Provider value={{ season, statusTemplates }}>
            {props.children}
        </SeasonContext.Provider>
    );
}