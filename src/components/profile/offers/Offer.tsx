import { H5 } from "../../common/Headers";
import { Text } from "../../common/Text";
import { UnderlinedItem } from "../../common/UnderlinedItem";

export const Offer = () => {
    return (
        <UnderlinedItem>
            <div className="flex flex-row gap-4 items-center">
                <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
                <div className="flex flex-col gap-1">
                    <H5 text="MCC-Tomsk" />
                    <Text text="Fullstack"/>
                </div>
            </div>
            <div>
                <span>waiting for answer</span>
            </div>
        </UnderlinedItem>
    );
}