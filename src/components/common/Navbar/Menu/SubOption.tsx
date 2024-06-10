import { FC } from "react";
import { NavLink } from "react-router-dom";
import { CommonText } from "../../Text";

type Props = {
    text: string;
    to: string;
}

export const SubOption: FC<Props> = props => {

    return (
        <NavLink 
            to={props.to} 
            className={({ isActive }) => `ps-10 py-3 ${isActive ? 'bg-blue-100' : 'bg-blue-500'}`}
        >
            {({ isActive }) => (
                <CommonText text={props.text} className={`${isActive ? 'text-blue-500' : 'text-slate-100'}`}/>
            )}
        </NavLink>
    );
}