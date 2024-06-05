import { FC, ReactElement, useState } from "react";
import { H4 } from "./Headers";
import { NavLink } from "react-router-dom";

type Props = {
    to: string;
    text: string;
    activeLogoSrc: string;
    deactiveLogoSrc: string;
}

export const NavOption: FC<Props> = props => {
    const isSelected = (isActive: boolean, isPending: boolean, isTransitioning: boolean) => isActive || isPending || isTransitioning;

    return (
        <NavLink 
            className={
                ({ isActive, isPending, isTransitioning }) => 
                    `flex flex-row items-center px-6 py-3 gap-3 ${ isSelected(isActive, isPending, isTransitioning) ? 'bg-slate-100 border-r-4 border-blue-900' : '' }`
            } 
            to={props.to}
        >
            {({ isActive, isPending, isTransitioning }) => (
                <>
                    <img className="w-8 h-8" src={isSelected(isActive, isPending, isTransitioning) ? props.activeLogoSrc : props.deactiveLogoSrc}></img>
                    <H4 text={props.text} color={isSelected(isActive, isPending, isTransitioning) ? 'text-blue-900' : 'text-slate-100'}/>
                </>
            )}
        </NavLink>
    );
}