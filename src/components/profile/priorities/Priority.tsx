import { FC } from "react"
import { UnderlinedItem } from "../../common/UnderlinedItem";
import { H5 } from "../../common/Headers";
import { DraggableIndicator } from "../../common/DraggableIndicator";

export const Priority: FC = () => {
    return (
        <UnderlinedItem>
            <div className="w-full flex flex-row gap-4 items-center hover:cursor-move">
                <DraggableIndicator />
                <H5 text="[MCC-Tomsk] prisma balls xdddddd lmao" color="text-black/85"/>
            </div>
        </UnderlinedItem>
    );
}