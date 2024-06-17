import { FC } from "react";
import { PageWithHeader } from "../common/PageWithHeader";
import { useParams } from "react-router-dom";
import { H4 } from "../common/Headers";
import { ProgressStepCard } from "./ProgressStepCard";
import { CommonText } from "../common/CommonText";
import { PositionDescriptionCard } from "./PositionDescriptionCard";

export const Progress: FC = () => {
    const { requestId } = useParams();
    return (
        <PageWithHeader headerText={requestId}>
            <div className="flex flex-col-reverse sm:flex-row gap-8 px-4 py-6">
                <div className="flex flex-col items-center gap-5 w-full sm:w-5/12">
                    <H4 text="История статусов" />
                    <div className="flex flex-row gap-4 w-full">
                        <ProgressStepCard 
                            headerText="Пригласили на секс"
                            description="Я хочу питсу"
                            date={new Date()}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-full sm:w-7/12">
                    <CommonText text={"статус тута типа..."} className="text-slate-400 w-full text-end" />
                    <PositionDescriptionCard />
                </div>
            </div>
        </PageWithHeader>
    )
}