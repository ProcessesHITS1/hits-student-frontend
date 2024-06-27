import { FC } from "react"
import { H5 } from "../common/Headers"
import { DiaryInfo } from "./DiaryInfo"
import { SemesterInfo } from "./SemesterInfo"
import { useGetLastSemester } from "./use-get-last-semester"

export const PracticeContainer: FC = () => {
    const semester = useGetLastSemester();

    return (
        <>
            {
                semester &&
                <div className="p-6 flex flex-col lg:flex-row gap-6">
                    <div className="flex w-full lg:w-1/2">
                        { semester?.id && <DiaryInfo semesterId={semester.id}/> }
                    </div>
                    <div className="flex flex-col gap-2 w-full lg:w-1/2 h-full">
                        <SemesterInfo semester={semester}/>
                        <div className="flex flex-row w-full justify-between px-6 py-4 border border-l-slate-200">
                            <H5 text="Дедлайн сдачи дневника:" />
                            {semester.documentsDeadline && <H5 text={new Date(semester.documentsDeadline).toLocaleDateString('ru')} className="text-blue-400"/>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}