import { FC } from "react";
import { Button } from "../common/Button";
import { H5 } from "../common/Headers";
import { CommonText } from "../common/CommonText";
import { Card } from "../common/Card";

type Props = {
    positionId: string;
    companyName: string;
    position: string;
    numberOfPositions: number;
    contact: string;
    tutor: string;
    onPress: () => void;
}

export const CompanyCard: FC<Props> = props => {
    return (
        <Card 
            header={() => <CardHeader companyName={props.companyName} onClick={props.onPress} />} 
            body={() => <CardBody position={props.position} contact={props.contact} tutor={props.tutor} nPos={props.numberOfPositions} />}
        />
    );
}

const CardHeader = (props: { companyName: string, onClick: () => void}) => {
    return (
        <div className="flex flex-row justify-between items-center">
            <H5 text={props.companyName} className="text-black"/>
            <Button onClick={props.onClick}>
                <CommonText text="Хочу сюда!" className="text-blue-600" />
            </Button>
        </div>
    )
}

const CardBody = (props: { position: string, contact: string, tutor: string, nPos: number }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <CommonText text={`${props.position} | ${getPositionsString(props.nPos)}`} className="text-black"/>
                <CommonText text={props.contact} className="text-black/45"/>
            </div>
            <CommonText text={props.tutor} className="text-black/45"/>
        </div>
    );
}

const getPositionsString = (numberOfPositions: number) => {
    let word = 'мест';

    const lastTwoNumbers = numberOfPositions % 100;
    const lastNumber = numberOfPositions % 10;

    if (lastTwoNumbers >= 10 && lastTwoNumbers <= 20 ) word = 'мест';
    else if (lastNumber > 1 && lastNumber < 5) word = 'места';
    else if (lastNumber === 1) word = 'место'

    return `${numberOfPositions} ${word}`;
};