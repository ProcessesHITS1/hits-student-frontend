import { FC } from "react";
import clip from "../../assets/clip.svg";
import { CommonText } from "../common/CommonText";

type Props = {
    id: string;
    name: string;
    uploadDate: Date;
}

export const UploadedFile: FC<Props> = ({ id, name, uploadDate }) => {
    return (
        <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row gap-1">
                <img src={clip} />
                <CommonText text={name} className="text-blue-400 hover:cursor-pointer"/>
            </div>
            <CommonText text={uploadDate.toLocaleString('ru')} className="text-black/45"/>
        </div>
    )
}