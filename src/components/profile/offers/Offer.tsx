import { H5 } from "../../common/Headers";
import { CommonText } from "../../common/CommonText";
import { UnderlinedItem } from "../../common/UnderlinedItem";
import { RequestResultDataResultStatusEnum } from "../../../api/clients/interview";
import { useQuery } from "../../../infrastructure/use-query";
import { companiesApi } from "../../../infrastructure/api-clients";
import { FC } from "react";

type Props = {
    companyId: string;
    positionTitle: string;
    resultStatus: RequestResultDataResultStatusEnum;
}

export const Offer: FC<Props> = props => {

    const { data: company } = useQuery(
        () => companiesApi.getCompany(props.companyId)
    );

    return (
        <UnderlinedItem>
            <div className="flex flex-row gap-4 items-center">
                <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
                <div className="flex flex-col gap-1">
                    {company?.name && <H5 text={company.name} />}
                    <CommonText text={props.positionTitle}/>
                </div>
            </div>
            <div>
                <CommonText text={props.resultStatus} />
            </div>
        </UnderlinedItem>
    );
}