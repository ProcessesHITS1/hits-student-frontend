import { FC } from "react";
import { Chat, CommonChatProps } from "./Chat"

type Props = {
    items: CommonChatProps[];
    onChatPress: (id: string) => void;
    isShown?: boolean;
}

export const ChatList: FC<Props> = props => {
    return (
        <div className="h-full w-full">
            {props.isShown && props.items.map(chat => 
                <Chat
                    key={chat.id} 
                    {...chat} 
                    onPress={() => props.onChatPress(chat.id)}
                />
            )}
        </div>
    );
}