import { FC } from "react";

export const DraggableIndicator: FC = () => {
    return (
        <div>
            <div className="grid grid-cols-2 grid-rows-3 gap-1">
                {Array.from({ length: 6 }, (_, i) => i).map(_ => <Dot />)}
            </div>
        </div>
    );
}

const Dot: FC = () => <div className="bg-blue-400 rounded-full w-1 h-1"></div>;