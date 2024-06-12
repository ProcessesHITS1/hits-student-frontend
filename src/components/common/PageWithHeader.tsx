import { FC, PropsWithChildren } from "react";
import { H2 } from "./Headers";
import { CommonText } from "./CommonText";

type Props = PropsWithChildren & {
    headerText?: string;
    textBelowHeader?: string | number;
}

export const PageWithHeader: FC<Props> = props => {
    return (
        <>
            <div className="h-full w-full flex flex-col bg-neutral-100">
                <div className="flex flex-col w-full py-3 items-center content-center justify-center bg-white min-h-20">
                    <H2 text={props.headerText} />
                    <CommonText text={props.textBelowHeader} />
                </div>
                <div className="py-8 px-6 w-full h-full">
                    <div className="bg-white w-full h-full rounded-xl">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}