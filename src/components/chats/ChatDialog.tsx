import { FC } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

type Props = {
    chatId?: string;
}

export const ChatDialog: FC<Props> = props => {
    return (
        <div className="w-full h-full flex flex-col border border-slate-200 items-center justify-between">
            <div className="h-full w-full bg-red-100">

            </div>
            <div className="flex flex-row w-full h-10">
                <Input type="text" className="h-full w-full"/>
                <Button className="h-full w-10 bg-blue-500" />
            </div>
        </div>
    )
}