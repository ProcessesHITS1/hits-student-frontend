import { FC } from "react"
import { UnderlinedItem } from "../../common/UnderlinedItem";
import { H5 } from "../../common/Headers";

export const Priority: FC = () => {
    return (
        <UnderlinedItem>
            <div className="w-full flex flex-row gap-4 items-center">
                <div className="flex flex-col gap-1">
                    <div className="w-2 h-3 rounded-t-full bg-red-900"></div>
                    <div className="w-2 h-3 rounded-b-full bg-red-900"></div>
                </div>
                <H5 text="[MCC-Tomsk] prisma balls xdddddd lmao" color="text-black/85"/>
            </div>
        </UnderlinedItem>
    );
}