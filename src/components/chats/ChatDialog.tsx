import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { ChatMessage } from "./ChatMessage";
import { MessageDto } from "../../api/clients/chats";
import { getUserClaims } from "../../infrastructure/user-claims";
import { Message } from "../../infrastructure/signalr-utils";

type Props = {
    chatId?: string;
    messages?: MessageDto[];
    onSend: (msg: Message) => Promise<void>;
}

export const ChatDialog: FC<Props> = ({ chatId, onSend, messages }) => {
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputMessage, setInputMessage] = useState<string | undefined>("");
    const sendMessage = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputMessage || !chatId) return;

        await onSend({
            Message: inputMessage,
            ChatId: chatId
        });
        setInputMessage(undefined);
        
        if (inputRef.current) {
            inputRef.current.value = "";
        }

    }, [inputMessage, chatId, onSend, inputRef])

    

    useEffect(() => {
        if (!messages) return;

        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current?.scrollHeight;
        }
    }, [messages, chatScrollRef])

    return (
        <div className="w-full flex flex-col border border-slate-200 items-center justify-between">
            <div className="p-2 w-full h-[76vh] block justify-end gap-2 overflow-y-scroll hidden-scrollbar" ref={inputRef}>
                {messages && messages.map(message => 
                    <ChatMessage
                        key={message.id} 
                        text={message.message}
                        isFromCurrentUser={message.author === getUserClaims()?.id}
                    />
                )}
            </div>
            <form className="flex flex-row w-full h-10" onSubmit={sendMessage}>
                <Input type="text" className="h-full w-full border border-slate-200 p-2" onChange={e => setInputMessage(e.target.value)} ref={inputRef}/>
                <Button className="h-full w-10 bg-blue-500" />
            </form>
        </div>
    )
}