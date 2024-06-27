import { ChangeEvent, FC, PropsWithChildren } from "react"
import { Input } from "./Input"

type Props = PropsWithChildren & {
    onChange: (e?: ChangeEvent<HTMLInputElement>) => Promise<void>;
    mulitple?: boolean;
    className?: string;
}

export const UploadFileWrapper: FC<Props> = props => {
    return (
        <div className={`relative ${props.className}` ?? "flex flex-col w-full h-full"}>
            <Input
                type="file"
                hidden
                multiple={props.mulitple}
                id="uploadfile" 
                onChange={props.onChange}
            />
            <label htmlFor="uploadfile" className="w-full h-full z-10">
                {props.children}
            </label>
        </div>
    )
}