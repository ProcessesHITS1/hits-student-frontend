import { FC } from "react";

type Props = {
    text: string | number;
    className?: string;
}

export const SmallCommonText: FC<Props> = props => {
    return <p className={`text-sm ${props.className} break-words`}>{props.text}</p>
}

export const CommonText: FC<Props> = props => {
    return <p className={`text-base ${props.className} break-words`}>{props.text}</p>
}