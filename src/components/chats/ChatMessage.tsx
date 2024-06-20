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
}

export const ChatMessage: FC<ChatMessageProps> = props => {
    return (
        <div className="flex flex-col gap-1 w-full flex-wrap mt-2">
            {props.authorName && <SmallCommonText text={props.authorName} className="text-black/45" />}
            <div className={`max-w-1/2 p-2 ${props.isFromCurrentUser ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}>
                {props.text && <CommonText text={props.text} className="text-wrap"/>}
                {
                    props.attachments &&
                    <div className="flex flex-col gap-1 mt-2">
                        {props.attachments.map(a => <AttachmentInMessage {...a} chatId={props.chatId} isFromCurrentUser={props.isFromCurrentUser} />)}
                    </div>
                }
            </div>
        </div>
    );
}