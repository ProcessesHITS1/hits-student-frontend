import { FC } from "react";
import { NavLink } from "react-router-dom";
import { CommonText } from "../../CommonText";

type Props = {
    text: string;
    to: string;
    onClick?: () => void;
}

export const SubOption: FC<Props> = props => {

    return (
        <NavLink 
            to={props.to} 
            className={({ isActive }) => `ps-10 py-3 ${isActive ? 'bg-blue-100' : 'bg-blue-500'}`}
            onClick={props.onClick}
        >
            {({ isActive }) => (
                <CommonText text={props.text} className={`${isActive ? 'text-blue-500' : 'text-slate-100'}`}/>
            )}
        </NavLink>
    );
}