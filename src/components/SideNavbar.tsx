import { Outlet } from "react-router-dom";
import { NavOption } from "./common/NavOption";
import avatarLogo from "../assets/avatar.svg";
import progressLogo from "../assets/progress.svg";
import smileLogo from "../assets/smile.svg";

export const SideNavbar = () => {
    return (
        <div className="flex flex-row h-full">
            <div className="min-h-full hidden lg:inline-block bg-blue-900">
                <nav className="w-80 sticky top-0">
                    <NavOption text="Профиль" activeLogoSrc={avatarLogo} deactiveLogoSrc={avatarLogo} to="/profile" />
                    <NavOption text="Компании" activeLogoSrc={progressLogo} deactiveLogoSrc={progressLogo} to="/companies" />
                    <NavOption text="Прогресс" activeLogoSrc={smileLogo} deactiveLogoSrc={smileLogo} to="/interviews" />
                </nav>
            </div>
            <Outlet />
        </div>
    );
}