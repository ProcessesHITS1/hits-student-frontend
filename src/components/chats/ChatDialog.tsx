import { FC } from "react";

type Props = {
    chatId?: string;
}

export const ChatDialog: FC<Props> = props => {
    return (
        <div className="w-full h-full flex flex-col border border-slate-200 items-center justify-center">
            {props.chatId ? props.chatId : "выберите какой-нибудь чат чтобы продолжить"}
        </div>
    )
}