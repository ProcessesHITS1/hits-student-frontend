import { FC, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader";
import { useParams } from "react-router-dom";
import { H4 } from "../common/Headers";
import { ProgressStepCard } from "./ProgressStepCard";
import { CommonText } from "../common/CommonText";
import { PositionDescriptionCard } from "./PositionDescriptionCard";
import { Button } from "../common/Button";
import { useQuery } from "../../infrastructure/use-query";
import { requestApi } from "../../infrastructure/api-clients";
import "../../styles/progress.css";
import { UpdateStatusModal } from "./UpdateStatusModal";

export const Progress: FC = () => {
    const { requestId } = useParams();

    const [isModalShown, setIsModalShown] = useState(false);

    const { data: request } = useQuery(
        () => requestApi.apiRequestRequestIdGet(requestId!)
    );


    return (
        <PageWithHeader headerText={request?.positionTitle ?? ''}>
            <div className="flex flex-col-reverse sm:flex-row gap-8 px-4 py-6">
                <div className="flex flex-col items-center gap-5 w-full sm:w-5/12">
                    <H4 text="История статусов" />
                    <div className="flex flex-col gap-4 w-full">
                        {
                            request?.requestStatusSnapshots &&
                            request.requestStatusSnapshots.map(x => 
                                <div className="border w-full h-full status">
                                    <ProgressStepCard
                                        headerText={x.status}
                                        date={new Date(x.dateTime)}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                {request?.positionId &&
                    <div className="flex flex-col gap-6 w-full sm:w-7/12">
                        <CommonText text={request?.requestResult?.description ?? 'В процессе...'} className="text-slate-400 w-full text-end" />
                        <PositionDescriptionCard positionId={request.positionId}/>
                        <Button className="flex justify-center items-center w-full h-10 bg-blue-500 outline-none" onClick={() => setIsModalShown(true)}>
                            <CommonText text="Обновить статус" className="text-white"/>
                        </Button>
                    </div>
                }
            </div>
            {
                requestId &&
                <UpdateStatusModal
                    requestId={requestId}
                    isOpen={isModalShown}
                    onRequestClose={() => setIsModalShown(false)} 
                />
            }
        </PageWithHeader>
    )
}