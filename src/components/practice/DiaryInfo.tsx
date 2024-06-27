import { FC, useContext, useEffect } from "react";
import { CommonText } from "../common/CommonText"
import { H5 } from "../common/Headers"
import { DiaryUploadContainer } from "./DiaryUploadContainer"
import { useQuery } from "../../infrastructure/use-query";
import { thirdCourseApi } from "../../infrastructure/api-clients";
import { UserInfoContext } from "../UserInfoContextProvider";
import { DiaryDto, DiaryFeedbackDtoAcceptanceStatusEnum } from "../../api/clients/internship";

type Props = {
    semesterId: string;
};

export const DiaryInfo: FC<Props> = props => {
    const userInfo = useContext(UserInfoContext);

    const { data: diary, refetch } = useQuery<{ studentId: string }, DiaryDto>(
        params => {
            return thirdCourseApi.getStudentDiary(props.semesterId, params.studentId);
        },
        { studentId: '3e914441-cd3d-4ec9-b5ca-12c3768dd4b8' },
        false
    );

    useEffect(() => {
        if (!userInfo?.id) return;
        refetch({ studentId: userInfo.id });
    }, [userInfo]);

    return (
        <>
            {
                userInfo &&
                <div className="flex flex-col w-full gap-4">
                    <DiaryUploadContainer diary={diary} studentId={userInfo.id!}/>
                    <div className="flex flex-row gap-2 items-center justify-between">
                        <H5 text="Статус:" className="text-black"/>
                        <CommonText text={statusToText(diary?.diaryFeedback?.acceptanceStatus)} className="text-black/45"/>
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <H5 text="Комментарий:" className="text-black"/>
                        <CommonText text={diary?.diaryFeedback?.comments ?? "Коментариев пока нет."} className="text-black/45"/>
                    </div>
                </div>
            }
        </>
    )
}

function statusToText(status?: DiaryFeedbackDtoAcceptanceStatusEnum) {
    if (status === 'ACCEPTED') return 'Принято';
    else if (status === 'REJECTED') return 'Отклонено';

    return 'Не оценено';
}