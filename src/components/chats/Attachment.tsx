import { FC } from "react";
import { CommonText } from "../common/CommonText";

export type AttachmentProps = Props & {
    file: File;
}

type Props = {
    name: string;
    mimeType: string;
}

export const Attachment: FC<Props> = props => {
    return (
        <div className="flex h-20 w-20 bg-slate-200 rounded-tr-3xl items-center justify-center border border-slate-400">
            <CommonText text={props.mimeType} className="text-center truncate" />
        </div>
    );
}