import { FC, PropsWithChildren, useEffect, useRef, useState } from "react"

type Props = PropsWithChildren & {
    downloadAction: () => Promise<{ file: Blob, name?: string }>;
    className?: string;
}

export const DownloadWrapper: FC<Props> = props => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [fileUrl, setFileUrl] = useState<string | undefined>();
    const [filename, setFilename] = useState<string | undefined>();

    const onPress = async () => {
        const { file, name } = await props.downloadAction();

        const url = URL.createObjectURL(file);

        setFilename(name);
        setFileUrl(url);
    };

    useEffect(() => {
        if (!fileUrl || !linkRef.current) return;

        linkRef.current.click();

        URL.revokeObjectURL(fileUrl);
    }, [fileUrl]);

    return (
        <>
            <div className={props.className ?? "w-full h-full"} onClick={onPress}>
                {props.children}
            </div>
            {fileUrl && <a href={fileUrl} download={filename} ref={linkRef} onClick={() => setFileUrl(undefined)}></a>}
        </>
    )
}