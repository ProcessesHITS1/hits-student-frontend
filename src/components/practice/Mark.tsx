import { FC, useMemo } from "react";
import { H5 } from "../common/Headers";
import { CommonText } from "../common/CommonText";

export type MarkProps = {
    mark?: number;
    description: string;
}

export const Mark: FC<MarkProps> = ({ mark, description }) => {

    const markColor = useMemo(() => {
        if (mark === undefined) return 'text-amber-200';
        else if (mark < 3) return 'text-red-400';

        return 'text-blue-400';
    }, [mark]);

    return (
        <div className="flex flex-row gap-6 items-center">
            <H5 text={mark ?? '-'} className={`text-base font-bold ${markColor} w-2`}/>
            <CommonText text={description} className="text-black"/>
        </div>
    );
}