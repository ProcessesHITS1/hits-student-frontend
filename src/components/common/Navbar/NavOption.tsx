import { FC } from "react";
import { NavLink } from "react-router-dom";
import { NavOptionHeader } from "./NavOptionHeader";

export type NavOptionProps = {
    to: string;
    text: string;
    activeLogoSrc: string;
    deactiveLogoSrc: string;
    onClick?: () => void;
}

export const NavOption: FC<NavOptionProps> = props => {

    return (
        <NavLink 
            className={
                ({ isActive }) => 
                    `flex px-6 py-3 ${ isActive ? 'bg-slate-100 border-r-4 border-blue-900' : '' }`
            } 
            to={props.to}
            onClick={props.onClick}
        >
            {({ isActive }) => (
                <NavOptionHeader 
                    text={props.text} 
                    textColor={isActive ? 'text-blue-900' : 'text-slate-100'}
                    img={isActive ? props.activeLogoSrc : props.deactiveLogoSrc}
                />
            )}
        </NavLink>
    );
}