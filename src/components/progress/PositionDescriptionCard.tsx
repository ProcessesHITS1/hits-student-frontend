import { Card } from "../common/Card"
import { Contact } from "../common/Contact";
import { H5 } from "../common/Headers";
import { CommonText } from "../common/CommonText";
import { FC, useContext, useEffect } from "react";
import { useQuery } from "../../infrastructure/use-query";
import { authApi, companiesApi, positionsApi } from "../../infrastructure/api-clients";
import { PositionInfo } from "../../api/clients/interview";
import { SeasonContext } from "../SeasonContextProvider";

type Props = {
    positionId: string;
}

type PositionsParams = {
    year: number;
}

export const PositionDescriptionCard: FC<Props> = ({ positionId }) => {
    const { season } = useContext(SeasonContext);

    const { data: position, refetch } = useQuery<PositionsParams, PositionInfo>(
        params => positionsApi.apiPositionYearPositionsPositionIdGet(params.year, positionId),
        { year: 2020 },
        false
    );

    useEffect(() => {
        if (!season?.year) return;
        refetch({ year: season.year })
    }, [season])

    return (
        <>
            {
                position &&
                    <Card 
                        header={(isExpanded) => 
                            <PositionDesciptionCardHeader 
                                isExpanded={isExpanded} 
                                description={position.description ?? ''}
                            />
                        } 
                        body={() => <PositionDesciptionCardBody companyId={position.companyId ?? ''} />}
                        isExpandable={true}
                    />
            }
        </>
    )
}

const PositionDesciptionCardHeader = (props: {isExpanded: boolean, description: string}) => {
    return (
        <div className="flex flex-col gap-3 items-center">
            <H5 text="О вакансии" className="text-black"/>
            {props.isExpanded && <CommonText text={props.description} className="text-black text-center"/>}
        </div>
    );
}

const PositionDesciptionCardBody = (props: {companyId: string}) => {

    const {data: company} = useQuery(
        () => companiesApi.getCompany(props.companyId)
    )

    const {data: curator, refetch} = useQuery(
        params => authApi.getUserInfo(params.id),
        { id: '' },
        false
    )

    useEffect(() => {
        if (!company?.curatorId) return;
        refetch({ id: company.curatorId })
    }, [company]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-1 items-start w-full">
                <H5 text={"Контакты"} className="text-black"/>
                <Contact name={company?.contacts?.[0] ?? ''} phone="+79095483131"/>
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
                <H5 text={"Куратор"} className="text-black"/>
                <Contact 
                    name={`${curator?.firstName} ${curator?.lastName}`} 
                    phone={curator?.phone}
                />
            </div>
        </div>
    );
}