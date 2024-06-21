import { FC } from "react";
import { H5 } from "../common/Headers";
import { CommonText } from "../common/CommonText";

type MessageProps = {
    text: string;
    byCurrentUser?: boolean
}

export type CommonChatProps = {
    name: string | null;
    lastMessage?: MessageProps;
    id: string;
    isActive?: boolean;
}

type Props = CommonChatProps & {
    onPress: () => void;
}

export const Chat: FC<Props> = props => {
    return (
        <div 
            className={`flex flex-row items-center gap-4 p-4 hover:cursor-pointer hover:opacity-70 ${props.isActive ? 'border border-blue-500' : 'border-b border-slate-200'}`} 
            onClick={props.onPress}
        >
            <div className="w-12 h-12 bg-blue-300" />
            <div className="flex flex-col gap-2 items-start">
                <H5 text={props.name ?? ''}/>
                {props.lastMessage && <CommonText text={formatMessageText(props.lastMessage)}/>}
            </div>
        </div>
    );
}

const formatMessageText = (data: MessageProps): string => {
    if (data.byCurrentUser) {
        return `Вы: ${data.text}`
    }

    return data.text;
}