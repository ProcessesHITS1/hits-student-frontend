import { FC } from "react";
import { PageWithHeader } from "../common/PageWithHeader";
import { useParams } from "react-router-dom";
import { H4 } from "../common/Headers";
import { ProgressStepCard } from "./ProgressStepCard";
import { Card } from "../common/Card";

export const Progress: FC = () => {
    const { requestId } = useParams();
    return (
        <PageWithHeader headerText={requestId}>
            <div className="flex flex-row gap-8 px-4 py-6 h-full">
                <div className="flex flex-col items-center w-1/2 gap-5">
                    <H4 text="История статусов" />
                    <div className="flex flex-row gap-4 w-full">
                        <ProgressStepCard 
                            headerText="Пригласили на секс"
                            description="Я хочу питсу"
                            date={new Date()}
                        />
                    </div>
                </div>
                <div className="w-full">
                </div>
            </div>
        </PageWithHeader>
    )
}