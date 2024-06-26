import { FC } from "react";

type Props = {
    text: string | number;
    className?: string;
}

const Header: FC<Props & { classes?: string }> = props => {
    return <span className={`font-medium ${props.classes} text-center`}>{props.text}</span>
}

export const H2: FC<Props> = props => {
    return <Header text={props.text} classes={`text-3xl ${props.className}`} />
}

export const H4: FC<Props> = props => {
    return <Header text={props.text} classes={`text-xl ${props.className}`} />
}

export const H5: FC<Props> = props => {
    return <Header text={props.text} classes={`text-lg ${props.className}`} />
}