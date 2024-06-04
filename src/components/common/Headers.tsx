import { FC } from "react";

type Props = {
    text: string;
    color?: string;
}

const Header: FC<Props & { classes?: string }> = props => {
    return <span className={`font-medium ${props.classes}`}>{props.text}</span>
}

export const H2: FC<Props> = props => {
    return <Header text={props.text} classes={`text-3xl ${props.color}`} />
}

export const H4: FC<Props> = props => {
    return <Header text={props.text} classes={`text-xl ${props.color}`} />
}