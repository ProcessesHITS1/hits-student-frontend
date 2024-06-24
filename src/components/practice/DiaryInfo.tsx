import { CommonText } from "../common/CommonText"
import { H5 } from "../common/Headers"
import { DiaryUploadContainer } from "./DiaryUploadContainer"

export const DiaryInfo = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <DiaryUploadContainer />
            <div className="flex flex-col gap-2 items-start">
                <H5 text="Комментарий:" className="text-black"/>
                <CommonText text={"Здесь могла быть ваша реклама. Амогус."} className="text-black/45"/>
            </div>
        </div>
    )
}