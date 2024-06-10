import { FC, ReactElement } from "react";

export type CommonCardProps = {
    body: ReactElement;
}

type Props = {
    isCurrent?: boolean;
    header: ReactElement;
    body: ReactElement;
}

export const Card: FC<Props> = props => {
    return (
        <div className={`flex flex-col border text-slate-200 w-full ${props.isCurrent ? 'border-blue-400' : ''}`}>
            <div className="py-2 mx-4 border-b text-slate-200">
                {props.header}
            </div>
            <div className="flex flex-col p-4 gap-2">
                {props.body}
            </div>
        </div>
    );
}