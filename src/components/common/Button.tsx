import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = props => {
    const { className, children, ...restProps } = props;
    return (
        <button className={`${className} w-full h-10 active:scale-90 transform transition duration-150`} {...restProps}>
            {children}
        </button>
    )
}