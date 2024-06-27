import { H5 } from "../../common/Headers";
import { CommonText } from "../../common/CommonText";
import { UnderlinedItem } from "../../common/UnderlinedItem";
import { useQuery } from "../../../infrastructure/use-query";
import { companiesApi } from "../../../infrastructure/api-clients";
import { FC } from "react";
import { RequestResultData } from "../../../api/clients/interview";

type Props = {
    companyId: string;
    positionTitle: string;
    resultStatus: RequestResultData;
}

export const Offer: FC<Props> = props => {

    const { data: company } = useQuery(
        () => companiesApi.getCompany(props.companyId)
    );

    return (
        <UnderlinedItem>
            <div className="flex flex-row gap-4 items-center">
                <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
                <div className="flex flex-col gap-1 items-start">
                    {company?.name && <H5 text={company.name} />}
                    <CommonText text={props.positionTitle}/>
                </div>
            </div>
            <div>
                <CommonText text={resultToString(props.resultStatus)} />
            </div>
        </UnderlinedItem>
    );
}

function resultToString(result: RequestResultData) {
    if (result.schoolResultStatus === 'Pending') return 'Ожидание ответа школы...';
    else if (result.studentResultStatus === 'Pending') return 'Ожидание вашего ответа...';
    else if (result.schoolResultStatus === 'Rejected' || result.studentResultStatus === 'Rejected') return 'Отклонено';

    return 'Принято';
}