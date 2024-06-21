import { FC, useEffect, useRef, useState } from "react";
import { AttachmentDto } from "../../api/clients/chats";
import axios from "axios";
import { Button } from "../common/Button";
import { CommonText } from "../common/CommonText";

type Props = Required<AttachmentDto> & {
    chatId: string;
    isFromCurrentUser?: boolean;
}

export const AttachmentInMessage: FC<Props> = props => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [fileUrl, setFileUrl] = useState<string | undefined>();

    const onPress = async () => {
        const file = await axios.get(`http://localhost:8010/chats/${props.chatId}/attachments/${props.id}`, { responseType: 'blob' });

        const url = URL.createObjectURL(file.data);

        setFileUrl(url);
    };

    useEffect(() => {
        if (!fileUrl || !linkRef.current) return;

        linkRef.current.click();

        URL.revokeObjectURL(fileUrl);
    }, [fileUrl]);

    return (
        <>
            <Button 
                className={`border h-8 rounded-tr-md px-2 ${props.isFromCurrentUser ? 'bg-blue-300 border-blue-400' : 'bg-slate-300 border-slate-400'}`} 
                onClick={onPress}
            >
                <CommonText text={props.mimeType ?? ''} />
            </Button>
            {fileUrl && <a href={fileUrl} download ref={linkRef} onClick={e => setFileUrl(undefined)}></a>}
        </>
    );
}