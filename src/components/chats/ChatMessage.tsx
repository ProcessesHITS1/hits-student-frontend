import { FC } from "react";
import { CommonText, SmallCommonText } from "../common/CommonText";
import { AttachmentDto } from "../../api/clients/chats";
import { AttachmentInMessage } from "./AttachmentInMessage";

export type ChatMessageProps = {
    text?: string | null;
    authorName?: string;
    isFromCurrentUser?: boolean;
    attachments?: Required<AttachmentDto>[];
    chatId: string;
    sentAt?: string;
}

export const ChatMessage: FC<ChatMessageProps> = props => {
    return (
        <div className="flex flex-col gap-1 w-full flex-wrap mt-2">
            <div className={`max-w-1/2 rounded-md p-2 ${props.isFromCurrentUser ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}>
                {props.authorName && <SmallCommonText text={props.authorName} className="text-black/45" />}
                {props.text && <CommonText text={props.text} className="text-wrap"/>}
                {
                    props.attachments &&
                    <div className="flex flex-col gap-1 my-2">
                        {props.attachments.map(a => <AttachmentInMessage {...a} chatId={props.chatId} isFromCurrentUser={props.isFromCurrentUser} key={a.id}/>)}
                    </div>
                }
                {props.sentAt && <SmallCommonText text={new Date(props.sentAt).toLocaleString('ru')} className="text-black/45 text-end"/>}
            </div>
        </div>
    );
}