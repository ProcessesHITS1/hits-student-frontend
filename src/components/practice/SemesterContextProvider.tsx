import { FC, PropsWithChildren, createContext, useContext, useEffect } from "react";
import { DeepRequired, useQuery } from "../../infrastructure/use-query";
import { SemesterDto } from "../../api/clients/internship";
import { thirdCourseApi } from "../../infrastructure/api-clients";
import { SeasonContext } from "../SeasonContextProvider";

type Semesters = DeepRequired<SemesterDto>[];

export const SemesterContext = createContext<Semesters>([]);

export const SemesterContextProvider: FC<PropsWithChildren> = props => {

    const { season } = useContext(SeasonContext);

    const { data: semesters, refetch } = useQuery<{ seasonId: string }, SemesterDto[]>(
        params => thirdCourseApi.getMySemestersInSeason(params.seasonId),
        { seasonId: '' },
        false
    );

    useEffect(() => {
        if (!season?.id) return;
        refetch({ seasonId: season.id });
    }, [season]);

    return (
        <SemesterContext.Provider value={semesters ?? []}>
            {props.children}
        </SemesterContext.Provider>
    )
}