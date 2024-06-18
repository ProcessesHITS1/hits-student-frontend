import { FC, act, useCallback, useState } from "react";
import { PageWithHeader } from "../common/PageWithHeader";
import { ChatDialog } from "./ChatDialog";
import { LARGE_SCREEN_BREAKPOINT_PX } from "../../infrastructure/constants";
import { useWindowDimensions } from "../../infrastructure/use-window-dimensions";
import { Button } from "../common/Button";
import { CommonText } from "../common/CommonText";
import { ChatList } from "./ChatList";
import { useQuery } from "../../infrastructure/use-query";
import { chatsApi } from "../../infrastructure/api-clients";

export const Chats: FC = () => {
    const { width } = useWindowDimensions();
    const isWindowSmall = width < LARGE_SCREEN_BREAKPOINT_PX;
    
    const {data: chats} = useQuery(() => chatsApi.chatsMyGet());
    
    const [isChatListShown, setIsChatListShown] = useState<boolean>(!isWindowSmall);
    const toggleChatListShown = useCallback(() => setIsChatListShown(v => !v), []);
    
    const [activeChatId, setActiveChatId] = useState<string | undefined>(undefined);
    const onChatPress = useCallback((id: string) => {
        setActiveChatId(id);
        setIsChatListShown(!isWindowSmall || false);   
    }, [setActiveChatId, setIsChatListShown, isWindowSmall])
    
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
                                    items={chats.map(chat => (
                                        { 
                                            id: chat.id, 
                                            name: chat.name, 
                                            lastMessage: { text: 'last message', byCurrentUser: false },
                                            isActive: chat.id === activeChatId
                                        }
                                    ))}
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