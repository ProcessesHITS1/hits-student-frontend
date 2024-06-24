import { H5 } from "../common/Headers"
import diaryUploadIcon from "../../assets/upload-diary.svg";
import { CommonText } from "../common/CommonText";
import { UploadedFile } from "./UploadedFile";

export const DiaryUploadContainer = () => {
    return (
        <div className="flex flex-col gap-2 items-start hover:cursor-pointer">
            <H5 text="Дневник практики" className="text-black"/>
            <div className="flex flex-col gap-6 w-full p-4 bg-gray-100 border border-gray-200 items-center">
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
            <UploadedFile id={"1"} name={"amogus_twerk.gif"} uploadDate={new Date()} />
        </div>
    )
}