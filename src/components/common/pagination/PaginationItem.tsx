import { FC } from "react";
import { Button } from "../Button";
import { CommonText } from "../CommonText";

type Props = {
    text: string | number;
    isSelected?: boolean;
    isDisabled?: boolean;
    onPress: () => Promise<void>;
}

export const PaginationItem: FC<Props> = props => {

    return (
        <Button 
            className={`justify-center items-center h-8 w-8 rounded-sm border ${props.isSelected ? 'border-blue-600' : 'border-slate-200'}`}
            onClick={props.onPress}
            disabled={props.isDisabled}
        >
            <CommonText text={props.text} className={`${ props.isDisabled ? 'text-slate-200' : props.isSelected ? 'text-blue-600' : ''}`}/>
        </Button>
    );
}