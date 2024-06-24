import { FC, ReactElement, useState } from "react";

export type CommonCardProps = {
    body?: (isExpanded: boolean) => ReactElement;
    isCurrent?: boolean;
    isExpandable?: boolean;
}

type Props = CommonCardProps & {
    header: (isExpanded: boolean) => ReactElement;
}

export const Card: FC<Props> = props => {
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpanded = () => setIsExpanded(value => !value);

    return (
        <div className={`flex flex-col border text-slate-200 w-full ${props.isCurrent ? 'border-blue-400' : ''}`}>
            <div className={`py-2 px-4 ${isExpanded ? 'border-b' : ''} text-slate-200`}>
                {props.header(isExpanded)}
                {props.isExpandable && 
                    <div className="absolute w-4 h-4 bg-red-900 top-2 right-2 hover:cursor-pointer" onClick={toggleExpanded}>
                    </div>
                }
            </div>
            {props.body && isExpanded &&
                <div className="flex p-4">
                    {props.body(isExpanded)}
                </div>
            }
        </div>
    );
}