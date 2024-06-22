import { FC, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader";
import { useParams } from "react-router-dom";
import { H4 } from "../common/Headers";
import { ProgressStepCard } from "./ProgressStepCard";
import { CommonText } from "../common/CommonText";
import { PositionDescriptionCard } from "./PositionDescriptionCard";
import { Button } from "../common/Button";
import Modal from 'react-modal';

export const Progress: FC = () => {
    const { requestId } = useParams();

    const [isModalShown, setIsModalShown] = useState(false);

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
                    <Button className="flex justify-center items-center w-full h-10 bg-blue-500 outline-none" onClick={() => setIsModalShown(true)}>
                        <CommonText text="Обновить статус" className="text-white"/>
                    </Button>
                </div>
            </div>
            <Modal
                isOpen={isModalShown}
                onRequestClose={() => setIsModalShown(false)}
                style={{
                     overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                     content: { inset: '25%', padding: '20px', }
                }}
            >
                <CommonText text="A modal XD" />
            </Modal>
        </PageWithHeader>
    )
}