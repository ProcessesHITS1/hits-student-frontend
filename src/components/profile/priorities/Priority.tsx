import { FC } from "react"
import { UnderlinedItem } from "../../common/UnderlinedItem";
import { H5 } from "../../common/Headers";

type Props = {
    name: string;
    onUp: () => void;
    onDown: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export const Priority: FC<Props> = props => {
    return (
        <UnderlinedItem>
            <div className="w-full flex flex-row gap-4 items-center">
                <div className="flex flex-col gap-1">
                    {!props.isFirst && <div className="w-2 h-3 rounded-t-full bg-blue-500 hover:cursor-pointer" onClick={props.onUp}></div>}
                    {!props.isLast && <div className="w-2 h-3 rounded-b-full bg-blue-500 hover:cursor-pointer" onClick={props.onDown}></div>}
                </div>
                <H5 text={props.name} className="text-black/85"/>
            </div>
        </UnderlinedItem>
    );
}