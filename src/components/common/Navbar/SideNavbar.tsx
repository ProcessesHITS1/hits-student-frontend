import { Outlet } from "react-router-dom";
import { FC } from "react";

import { NavOptionsContainer } from "./NavOptionsContainer";

export const SideNavbar: FC = () => {
    return (
        <div className="h-full">
            <div className="absolute h-full w-80 bg-blue-900">
                <NavOptionsContainer />
            </div>
            <div className="flex w-full h-full pl-80">
                <Outlet />
            </div>
        </div>
    );
}