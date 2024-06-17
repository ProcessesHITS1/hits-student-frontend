import { FC } from "react";
import { CommonText } from "./CommonText";

type Props = {
    name: string;
    phone?: string;
}

export const Contact: FC<Props> = props => {
    return (
        <div className="flex flex-col gap-1 items-start">
            <CommonText text={props.name} className="text-black"/>
            {props.phone && <CommonText text={`Телефон: ${props.phone}`} className="text-black"/>}
        </div>
    )
}