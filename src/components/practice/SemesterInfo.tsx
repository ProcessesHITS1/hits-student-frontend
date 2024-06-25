import { Card } from "../common/Card";
import { H5 } from "../common/Headers";
import { CommonText } from "../common/CommonText";
import { Mark, MarkProps } from "./Mark";
import { DeepRequired, useQuery } from "../../infrastructure/use-query";
import { MarkDto, MarkRequirementDto, SemesterDto } from "../../api/clients/internship";
import { FC, useEffect, useState } from "react";
import { thirdCourseApi } from "../../infrastructure/api-clients";

type Props = {
    semester: DeepRequired<SemesterDto>;
}

export const SemesterInfo: FC<Props> = props => {
    return (
        <Card 
            header={() => <SemesterInfoHeader {...props}/>}
            body={() => <SemesterInfoBody {...props} />}
        />
    );
}

const SemesterInfoHeader: FC<Props> = ({ semester }) => {
    const courseNumber = semester.semester && semester.semester > 2 ? 4 : 3;

    return (
        <div className="flex flex-col w-full gap-1 items-center">
            <H5 text={`${courseNumber} курс`} className="text-black"/>
            <CommonText text={`${semester.semester} семестр, ${semester.year}`} className="text-black"/>
        </div>
    )
}

const SemesterInfoBody: FC<Props> = ({ semester }) => {

    const { data: markRequirements, refetch: refetchRequirements } = useQuery<{ id: string }, MarkRequirementDto[]>(
        params => thirdCourseApi.getMarkRequirements1(params.id),
        { id: '' }
    );

    const { data: marks, refetch: refetchMarks } = useQuery<{ id: string }, MarkDto[]>(
        params => thirdCourseApi.getMyMarksForSemester(params.id),
        { id: '' }
    );

    const [mergedMarks, setMergedMarks] = useState<MarkProps[]>([]);

    useEffect(() => {
        if (!semester?.id) return;

        refetchRequirements({ id: semester.id })
        refetchMarks({ id: semester.id })
    }, [semester])

    useEffect(() => {
        if (!markRequirements) return;
        if (!marks) return;

        const mergedMarksWithRequirements = 
            markRequirements.map(mr => ({
                mark: marks.find(m => m.markRequirement.id === mr.id)?.value,
                description: mr.description
            }));
        
        setMergedMarks(mergedMarksWithRequirements);

    }, [markRequirements, marks])

    return (
        <div className="flex flex-col gap-2 items-start px-4">
            <H5 text="Оценки" className="text-black"/>
            <div className="flex flex-col gap-2">
                {
                    mergedMarks.map(m => 
                        <Mark {...m} key={m.description}/>
                    )
                }
            </div>
        </div>
    );
}
