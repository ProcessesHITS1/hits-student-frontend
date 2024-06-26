import { FC, useCallback } from "react";
import clip from "../../assets/clip.svg";
import { CommonText } from "../common/CommonText";
import { DownloadWrapper } from "../common/DownloadWrapper";
import axios from "axios";
import { getContentDisposition } from "../../infrastructure/axios-utils";

type Props = {
    id: string;
    name: string;
    uploadDate?: Date;
}

export const UploadedFile: FC<Props> = ({ id, name, uploadDate }) => {
    const downloadAction = useCallback(async () => {
        const response = await axios.get(`http://localhost:8091/api/files/download/${id}`, { responseType: 'blob' });

        return {
            file: new Blob([response.data], { type: 'octet/stream' }),
            name: getContentDisposition(response)
        };
    }, [id]);

    return (
        <DownloadWrapper downloadAction={downloadAction}>
            <div className="flex flex-row justify-between w-full items-center">
                <div className="flex flex-row gap-1">
                    <img src={clip} />
                    <CommonText text={name} className="text-blue-400 hover:cursor-pointer"/>
                </div>
                {uploadDate && <CommonText text={uploadDate.toLocaleString('ru')} className="text-black/45"/>}
            </div>
        </DownloadWrapper>
    )
}