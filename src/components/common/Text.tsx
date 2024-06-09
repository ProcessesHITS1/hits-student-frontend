import { FC } from "react";

type Props = {
    text?: string | number;
    className?: string;
}

export const CommonText: FC<Props> = props => {
    return <span className={`text-base ${props.className}`}>{props.text}</span>
}