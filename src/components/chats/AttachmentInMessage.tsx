import { FC } from "react";
import { AttachmentDto } from "../../api/clients/chats";
import axios from "axios";
import { CommonText } from "../common/CommonText";
import { DownloadWrapper } from "../common/DownloadWrapper";

type Props = Required<AttachmentDto> & {
    chatId: string;
    isFromCurrentUser?: boolean;
}

export const AttachmentInMessage: FC<Props> = props => {    
    const downloadAction = async () => {
        const file = await axios.get(`http://localhost:8010/chats/${props.chatId}/attachments/${props.id}`, { responseType: 'blob' });
        return file.data;
    }

    return (
        <DownloadWrapper
            downloadAction={downloadAction}
        >
            <div 
                className={`border h-8 rounded-tr-md px-2 ${props.isFromCurrentUser ? 'bg-blue-300 border-blue-400' : 'bg-slate-300 border-slate-400'}`} 
            >
                <CommonText text={props.mimeType ?? ''} />
            </div>
        </DownloadWrapper>
    );
}