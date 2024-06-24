import { FC } from "react";
import { Button } from "./Button";
import { CommonText } from "./CommonText";

type Props = {
    text: string;
}

export const SubmitButton: FC<Props> = props => {
    return (
        <Button className="self-end px-2 bg-blue-400" type="submit">
            <CommonText text={props.text} className="text-white"/>
        </Button>
    )
}