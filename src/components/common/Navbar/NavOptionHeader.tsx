import { FC } from "react";
import { H4 } from "../Headers";

type Props = {
    text: string;
    textColor: string;
    img?: string;
}

export const NavOptionHeader: FC<Props> = props => {
    return (
        <div className="flex flex-row gap-3 items-center w-full">
            {props.img && <img className="w-8 h-8" src={props.img}></img>}
            <H4 text={props.text} color={props.textColor}/>
        </div>
    );
}