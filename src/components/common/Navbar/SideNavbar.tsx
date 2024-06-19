import { FC } from "react";

import { NavOptionsContainer } from "./NavOptionsContainer";

export const SideNavbar: FC = () => {
    return (
        <div className="absolute h-full w-80 bg-blue-900">
            <NavOptionsContainer />
        </div>
    );
}