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
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getAccessToken } from "../../infrastructure/access-token-storage";
import { useAsyncEffect } from "../../infrastructure/use-async-effect";
import { CommonChatProps } from "./Chat";
import { getUserClaims } from "../../infrastructure/user-claims";
import { Message } from "../../infrastructure/signalr-utils";

export const Chats: FC = () => {
    const { width } = useWindowDimensions();
    const isWindowSmall = width < LARGE_SCREEN_BREAKPOINT_PX;
    
    const chatsQuery = useQuery(() => chatsApi.chatsMyGet());
    const [chats, setChats] = useState<CommonChatProps[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | undefined>();
    
    const [isChatListShown, setIsChatListShown] = useState<boolean>(!isWindowSmall);
    const toggleChatListShown = useCallback(() => setIsChatListShown(v => !v), []);
    
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
                isActive: false
            })
        ))

    }, [chatsQuery.isLoading, chatsQuery.data])

    useAsyncEffect(async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:8010/chatting", { accessTokenFactory: () => getAccessToken() || "", withCredentials: false})
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Debug)
            .build();
        
        connection.on("Send", data => setChats(prev => {
            const chat = prev.find(c => c.id === data.chatId);

            if (chat) {
                const claims = getUserClaims();
                chat.lastMessage = { text: data.message, byCurrentUser: data.author === claims?.id };
            }

            return [...prev];
        }));

        await connection.start();
        await connection.invoke<Message>("Send", {
            Message: "amoga",
            ChatId: "651a7767-fe08-4e34-ab42-80dad604ca51"
        });
    }, [])

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
                    <ChatDialog chatId={activeChatId} />
                </div>
            </div>
        </PageWithHeader>   
    )
}