import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { ChatMessage } from "./ChatMessage";
import { MessageDto } from "../../api/clients/chats";
import { getUserClaims } from "../../infrastructure/user-claims";
import { Message } from "../../infrastructure/signalr-utils";
import { Attachment, AttachmentProps } from "./Attachment";
import { authApi, chatsApi } from "../../infrastructure/api-clients";
import { UploadFileWrapper } from "../common/UploadFileWrapper";
import { useQuery } from "../../infrastructure/use-query";
import { UserInfoDto } from "../../api/clients/auth";
import { useAsyncEffect } from "../../infrastructure/use-async-effect";
import { isRequestSuccessful } from "../../infrastructure/http-helpers";

type Props = {
    chatId?: string;
    messages?: MessageDto[];
    onSend: (msg: Message) => Promise<void>;
}

export const ChatDialog: FC<Props> = ({ chatId, onSend, messages }) => {
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [membersInfo, setMembersInfo] = useState<UserInfoDto[]>([]);

    const { data: chatInfo, refetch: refetchMembers } = useQuery(
        params => chatsApi.chatsGroupIdGet(params.chatId),
        { chatId: '' },
        false
    );

    useEffect(() => {
        if (!chatId) return;
        refetchMembers({ chatId })
    }, [chatId]);

    useAsyncEffect(async () => {
        if (!chatInfo?.members) return;

        const promises: Promise<UserInfoDto | undefined>[] = [];
        chatInfo.members.forEach(
            memberId => promises.push(
                authApi
                    .getUserInfo(memberId)
                    .then(response => isRequestSuccessful(response) ? response.data : undefined)
            )
        );

        const members = await Promise.all(promises);
        members.forEach(m => {
            if (m === undefined) return;
            setMembersInfo(prev => [...prev, m]);
        });
    }, [chatInfo]);

    const [inputMessage, setInputMessage] = useState<string | undefined>("");
    
    const [attachments, setAttachments] = useState<AttachmentProps[]>([]);
    const addAttachment = useCallback(async (e?: ChangeEvent<HTMLInputElement>) => {
        const files = e?.target.files;
        
        if (!files) return;
        
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            setAttachments(prev => [...prev, { name: file.name, mimeType: file.type, file}])
        }
        
    }, [setAttachments])

    const sendMessage = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputMessage || !chatId) return;

        const attachmentIds: string[] = [];

        for (const attachment of attachments) {
            const response = await chatsApi.chatsChatIdAttachmentsPost(chatId, attachment.file);
            if (!response.data) continue;

            attachmentIds.push(response.data);
        }

        await onSend({
            Message: inputMessage,
            ChatId: chatId,
            AttachmentIds: attachmentIds
        });

        setInputMessage(undefined);
        setAttachments([]);
        
        if (inputRef.current) {
            inputRef.current.value = "";
        }

    }, [inputMessage, chatId, onSend, inputRef, attachments]);
    
    useEffect(() => {
        if (!messages) return;

        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current?.scrollHeight;
        }
    }, [messages, chatScrollRef]);

    return (
        <div className="w-full flex flex-col border border-slate-200 items-center justify-between">
            <div className="p-2 w-full h-[76vh] block gap-2 overflow-y-scroll hidden-scrollbar" ref={inputRef}>
                <div className="flex flex-col h-full w-full justify-end">
                    {messages && messages.map(message => 
                        <ChatMessage
                            key={message.id} 
                            text={message.message}
                            authorName={membersInfo.find(x => x.id === message.author)?.firstName}
                            isFromCurrentUser={message.author === getUserClaims()?.id}
                            attachments={message.attachments?.map(a => ({...a as Required<typeof a>})) ?? []}
                            chatId={message.chatId!}
                            sentAt={message.sentAt}
                        />
                    )}
                </div>
            </div>
            {
                attachments.length > 0 &&
                <div className="flex flex-row w-full justify-start gap-2 p-2 border-t border-e border-slate-200">
                    {attachments.map(a => <Attachment name={a.name} mimeType={a.mimeType} />)}
                </div>
            }
            <form className="flex flex-row w-full h-10" onSubmit={sendMessage}>
                <UploadFileWrapper 
                    mulitple
                    className="flex w-10 h-full bg-slate-200 hover:cursor-pointer" 
                    onChange={addAttachment}
                />
                <Input type="text" onChange={e => setInputMessage(e.target.value)} ref={inputRef}/>
                <Button className="h-full w-10 bg-blue-500" />
            </form>
        </div>
    )
}