import { H5 } from "../common/Headers"
import { PageWithHeader } from "../common/PageWithHeader"
import { DiaryInfo } from "./DiaryInfo"
import { SemesterInfo } from "./SemesterInfo"

export const Practice = () => {
    return (
        <PageWithHeader
            headerText="Практика"
        >
            <div className="p-6 flex flex-row gap-6">
                <div className="flex w-1/2">
                    <DiaryInfo />
                </div>
                <div className="flex flex-col gap-2 w-1/2 h-full">
                    <SemesterInfo />
                    <div className="flex flex-row w-full justify-between px-6 py-4 border border-l-slate-200">
                        <H5 text="Дедлайн сдачи дневника:" />
                        <H5 text="22 мая 2024" className="text-blue-400"/>
                    </div>
                </div>
            </div>
        </PageWithHeader>        
    )
}