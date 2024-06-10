import { FC } from "react";
import { CardWithHeader } from "../common/CardWithHeader";
import { CommonText } from "../common/Text";

type Props = {
    headerText: string;
    description?: string;
    date: Date;
}

export const ProgressStepCard: FC<Props> = props => {
    return (
        <CardWithHeader 
            headerText={props.headerText} 
            body={
                <div className="flex flex-col gap-2">
                    {props.description && <CommonText text={props.description} className="text-black"/>}
                    <CommonText text={props.date.toLocaleDateString("ru")} className="text-black/45"/>
                </div>
            } 
        />
    );
}