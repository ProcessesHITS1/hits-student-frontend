import { FC } from "react";
import { Priority } from "./Priority";

export const Priorities: FC = () => {
    return (
        <div className="flex flex-col px-6 w-full">
            <Priority />
            <Priority />
            <Priority />
        </div>
    );
}