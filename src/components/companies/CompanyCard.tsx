import { FC, useCallback } from "react";
import { Button } from "../common/Button";
import { H5 } from "../common/Headers";
import { CommonText } from "../common/Text";
import { getCurrentUserId } from "../../infrastructure/user-info-storage";
import { requestApi } from "../../infrastructure/api-clients";

type Props = {
    positionId: string;
    companyName: string;
    position: string;
    numberOfPositions: number;
    contact: string;
    tutor: string;
}

export const CompanyCard: FC<Props> = props => {
    const onButtonPress = useCallback(async () => {
        const userId = getCurrentUserId();

        if (!userId) return;

        await requestApi.apiRequestStudentStudentIdPositionPositionIdPost(userId, props.positionId);
    }, [props.positionId]);

    return (
        <div className="flex flex-col border border-slate-200 w-full">
            <div className="flex flex-row border-b border-slate-200 items-center justify-between px-6 py-4">
                <H5 text={props.companyName} />
                <Button onClick={onButtonPress}>
                    <CommonText text="Хочу сюда!" className="text-blue-600" />
                </Button>
            </div>
            <div className="flex flex-col p-4 gap-3">
                <div className="flex flex-col gap-2">
                    <CommonText text={`${props.position} | ${getPositionsString(props.numberOfPositions)}`} />
                    <CommonText text={props.contact} className="text-black/45"/>
                </div>
                <CommonText text={props.tutor} className="text-black/45"/>
            </div>
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