import { FC } from "react";
import { CommonText, SmallCommonText } from "../common/CommonText";

export type ChatMessageProps = {
    text: string;
    authorName?: string;
    isFromCurrentUser?: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = props => {
    return (
        <div className="flex flex-col gap-1 w-full flex-wrap">
            {props.authorName && <SmallCommonText text={props.authorName} className="text-black/45" />}
            <div className={`max-w-1/2 p-2 ${props.isFromCurrentUser ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}>
                <CommonText text={props.text} className="text-wrap"/>
            </div>
        </div>
    );
}