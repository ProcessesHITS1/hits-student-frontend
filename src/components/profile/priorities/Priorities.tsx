import { FC, useState } from "react";
import { Priority } from "./Priority";

export const Priorities: FC = () => {
    const [priorities, setPriorities] = useState<string[]>([
        "MCC Soft",
        "MCC Soft 2",
        "MCC Soft 3"
    ]);

    const onDown = (index: number) => {
        if (index === priorities.length - 1) return;

        setPriorities(p => {
            [p[index], p[index + 1]] = [p[index + 1], p[index]];
            return [...p];
        });
    }

    const onUp = (index: number) => {
        if (index === 0) return;

        setPriorities(p => {
            [p[index - 1], p[index]] = [p[index], p[index - 1]];
            return [...p];
        });
    }

    return (
        <div className="flex flex-col px-6 w-full">
            {priorities.map((name, index) => 
                <Priority
                    key={name} 
                    name={name}
                    isFirst={index === 0}
                    isLast={index === priorities.length - 1}
                    onDown={() => onDown(index)}
                    onUp={() => onUp(index)}
                />
            )}
        </div>
    );
}