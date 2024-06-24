import { Card } from "../common/Card";
import { H5 } from "../common/Headers";
import { CommonText } from "../common/CommonText";
import { Mark } from "./Mark";

export const SemesterInfo = () => {
    return (
        <Card 
            header={() => <SemesterInfoHeader />}
            body={() => <SemesterInfoBody />}
        />
    );
}

const SemesterInfoHeader = () => {
    return (
        <div className="flex flex-col w-full gap-1 items-center">
            <H5 text="3 курс" className="text-black"/>
            <CommonText text="2 семестр, 2024" className="text-black"/>
        </div>
    )
}

const SemesterInfoBody = () => {
    return (
        <div className="flex flex-col gap-2 items-start px-4">
            <H5 text="Оценки" className="text-black"/>
            <div className="flex flex-col gap-2">
                <Mark mark={5} description={"Оценка за кол-во часов в Warframe"} />
                <Mark mark={2} description={"Оценка за бытие sussy back'ой"} />
                <Mark description={"Оценка за красивые глазки"} />
            </div>
        </div>
    );
}
