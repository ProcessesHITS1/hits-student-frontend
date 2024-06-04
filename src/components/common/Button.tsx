import { FC, HTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren & HTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = props => {
    return (
        <button className={`${props.className} w-full h-10 active:scale-90 transform transition duration-150`}>
            {props.children}
        </button>
    )
}