import { FC, useCallback, useEffect, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader";
import { ChatDialog } from "./ChatDialog";
import { LARGE_SCREEN_BREAKPOINT_PX } from "../../infrastructure/constants";
import { useWindowDimensions } from "../../infrastructure/use-window-dimensions";
import { Button } from "../common/Button";
import { CommonText } from "../common/CommonText";
import { ChatList } from "./ChatList";
import { useQuery } from "../../infrastructure/use-query";
import { chatsApi } from "../../infrastructure/api-clients";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getAccessToken } from "../../infrastructure/access-token-storage";
import { useAsyncEffect } from "../../infrastructure/use-async-effect";
import { CommonChatProps } from "./Chat";
import { getUserClaims } from "../../infrastructure/user-claims";
import { Message } from "../../infrastructure/signalr-utils";
import { MessageDto } from "../../api/clients/chats";

type QueryParams = {
    chatId: string;
};

export const Chats: FC = () => {
    const { width } = useWindowDimensions();
    const isWindowSmall = width < LARGE_SCREEN_BREAKPOINT_PX;
    
    const chatsQuery = useQuery(() => chatsApi.chatsMyGet());
    const [chats, setChats] = useState<CommonChatProps[]>([]);

    const [activeChatId, setActiveChatId] = useState<string | undefined>();
    const { refetch, data: chatMessages }
        = useQuery<QueryParams, MessageDto[]>(
            params => chatsApi.chatsChatIdMessagesGet(params.chatId),
            { chatId: activeChatId ?? "" }
        )
    const [activeChatMessages, setActiveChatMessages] = useState(chatMessages ?? []);

    useEffect(() => {
        if (!chatMessages) return;
        setActiveChatMessages(chatMessages);
    }, [chatMessages]);

    useEffect(() => {
        if (!activeChatId) return;
        refetch({ chatId: activeChatId });
    }, [activeChatId])
    
    const [isChatListShown, setIsChatListShown] = useState<boolean>(!isWindowSmall);
    const toggleChatListShown = useCallback(() => setIsChatListShown(v => !v), []);

    const [connection, setConnection] = useState<HubConnection | undefined>();
    const onSend = useCallback(async (msg: Message) => {
        if (!connection) return;

        await connection.invoke<Message>("Send", msg);
    }, [connection])

    useEffect(() => setIsChatListShown(!isWindowSmall || false), [isWindowSmall, setIsChatListShown])
    
    const onChatPress = useCallback((id: string) => {
        setChats(prev => {
            const chat = prev.find(c => c.id === id);

            prev.forEach(c => c.isActive = false);
            if (chat) {
                chat.isActive = true;
                setActiveChatId(id);
            }

            return [...prev];
        })

        setIsChatListShown(!isWindowSmall || false);   
    }, [setIsChatListShown, isWindowSmall]);

    useEffect(() => {
        if (chatsQuery.isLoading || chatsQuery.data === undefined) return;

        setChats(chatsQuery.data.map(
            chat => ({ 
                id: chat.id, 
                name: chat.name, 
                isActive: false,
            })
        ))

    }, [chatsQuery.isLoading, chatsQuery.data])

    useAsyncEffect(async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:8010/chatting", { accessTokenFactory: () => getAccessToken() || "", withCredentials: false})
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Debug)
            .build();
        
        connection.on("Send", data => {
            setChats(prev => {
                const chat = prev.find(c => c.id === data.chatId);
    
                if (chat) {
                    const claims = getUserClaims();
                    chat.lastMessage = { text: data.message, byCurrentUser: data.author === claims?.id };
                }
    
                return [...prev];
            })

            if(data.chatId === activeChatId) {
                setActiveChatMessages(prev => {
                    prev.push({
                        id: data.id,
                        chatId: data.chatId,
                        author: data.author,
                        message: data.message,
                        sentAt: data.sentAt,
                        attachments: data.attachments
                    });

                    return [...prev];
                })
            }
        });

        await connection.start();
        setConnection(connection);
    }, [activeChatId])

    return (
        <PageWithHeader headerText="Сообщения">
            <div className="relative w-full h-full flex flex-col lg:flex-row p-6 gap-2 lg:gap-6">
                <div className=" relative flex flex-col w-full lg:w-1/3 bg-white">
                    {isWindowSmall && 
                        <Button onClick={toggleChatListShown} className="w-full border border-slate-500 h-10">
                            <CommonText text={"Чаты"} />
                        </Button>
                    }
                    {isChatListShown &&
                        <div className={`absolute w-full bg-white ${isWindowSmall ? 'top-10' : ''}`}>
                            {chats && 
                                <ChatList 
                                    items={chats}
                                    isShown={isChatListShown}
                                    onChatPress={onChatPress}
                                />
                            }
                        </div>
                    }
                </div>
                <div className="w-full h-full lg:w-2/3">
                    <ChatDialog chatId={activeChatId} onSend={onSend} messages={activeChatMessages}/>
                </div>
            </div>
        </PageWithHeader>   
    )
}