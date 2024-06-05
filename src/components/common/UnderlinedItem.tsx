import { FC, PropsWithChildren } from "react";

export const UnderlinedItem: FC<PropsWithChildren> = props => {
    return (
        <div 
            className="w-full flex flex-row justify-between content-center items-center border-b border-slate-200 py-4"
        >
            {props.children}
        </div>
    );
}