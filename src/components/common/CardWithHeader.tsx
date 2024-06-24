import { FC } from "react";
import { Card, CommonCardProps } from "../common/Card";
import { H5 } from "../common/Headers";

type Props = CommonCardProps & {
    headerText: string;
}

export const CardWithHeader: FC<Props> = props => {
    return (
        <Card 
            header={() => <H5 text={props.headerText} className="text-black"/>} 
            body={props.body}       
        />
    );
}