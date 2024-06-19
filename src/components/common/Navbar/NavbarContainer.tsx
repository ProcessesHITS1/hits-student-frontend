import { Outlet } from "react-router-dom";
import { NavbarProvider } from "./NavbarProvider";

export const NavbarContainer = () => {
    return (
        <div className="w-full h-full relative">
            <NavbarProvider />
            <div className="w-full h-full lg:pl-80 pt-10 lg:pt-0">
                <div className="pt-8 lg:pt-0 w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}