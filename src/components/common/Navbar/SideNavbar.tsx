import { Outlet } from "react-router-dom";
import { NavOption, NavOptionProps } from "../NavOption";
import { FC } from "react";

type Props = {
    routes: NavOptionProps[]
}

export const SideNavbar: FC<Props> = props => {
    return (
        <div className="h-full">
            <nav className="absolute h-full  w-80 bg-blue-900 hidden lg:block">
                {props.routes.map(route => <NavOption {...route}/>)}
            </nav>
            <div className="flex w-full h-full lg:pl-80">
                <Outlet />
            </div>
        </div>
    );
}