import { FC } from "react";
import { ChatMessage } from "./ChatMessage";

type Props = {
    chatId?: string;
}

export const ChatDialog: FC<Props> = props => {
    return (
        <div className="w-full h-full flex flex-col border border-slate-200 justify-end gap-2 p-2">
            <ChatMessage text={"амогус?"} authorName="kira yoshikage"/>
            <ChatMessage text={"амогус."} />
            <ChatMessage text={"текст вриба??????????????????????????????????????????"} isFromCurrentUser/>
            <ChatMessage text={"ноу ноу ноу мистер фиш"} />
        </div>
    )
}