import { H5 } from "../common/Headers"
import diaryUploadIcon from "../../assets/upload-diary.svg";
import { CommonText } from "../common/CommonText";
import { UploadedFile } from "./UploadedFile";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { DiaryDto } from "../../api/clients/internship";
import { UploadFileWrapper } from "../common/UploadFileWrapper";
import { thirdCourseApi } from "../../infrastructure/api-clients";
import { isRequestSuccessful } from "../../infrastructure/http-helpers";

type Props = {
    diary?: DiaryDto;
    studentId: string;
}

export const DiaryUploadContainer: FC<Props> = ({ diary, studentId }) => {
    const [attachmentId, setAttachmentId] = useState<string | undefined>(diary?.documentId);

    const onUploadInputChange = useCallback(async (e?: ChangeEvent<HTMLInputElement>) => {
        e?.preventDefault();

        const file = e?.target.files?.item(0);
        if (!file) return;

        const uploadResponse = await thirdCourseApi.upload(file);

        if (!isRequestSuccessful(uploadResponse)) return;

        const diaryResponse = await thirdCourseApi.addDiaryToStudent({
            documentId: uploadResponse.data,
            studentId: studentId
        })

        if (!isRequestSuccessful(diaryResponse)) return;

        setAttachmentId(uploadResponse.data);
    }, [diary, studentId]);

    useEffect(() => {
        if (!diary) return;
        setAttachmentId(diary.documentId);
    }, [diary]);

    return (
        <div className="flex flex-col gap-2 items-start hover:cursor-pointer">
            <H5 text="Дневник практики" className="text-black"/>
            <UploadFileWrapper
                onChange={onUploadInputChange}
            >
                <div className="relative flex flex-col gap-6 w-full p-4 bg-gray-100 border border-gray-200 items-center">
                        <img src={diaryUploadIcon} className="w-10 h-10"/>
                        <div className="flex flex-col gap-2">
                            <CommonText 
                                text={"Нажмите, чтобы загрузить файл"} 
                                className="text-black text-center"
                            />
                            <CommonText 
                                text={"Убедитесь, что в документе исправлены даты, добавлены список задач и характеристика с места прохождения практики."} 
                                className="text-black/45 text-center"
                            />
                        </div>
                </div>
            </UploadFileWrapper>
            {attachmentId && <UploadedFile id={attachmentId} name={attachmentId} />}
        </div>
    )
}