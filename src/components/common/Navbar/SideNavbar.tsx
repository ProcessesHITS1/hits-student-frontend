import { Outlet } from "react-router-dom";
import { NavOption } from "./NavOption";
import { FC } from "react";
import avatarLogoDark from "../../../assets/avatar-dark.svg";
import avatarLogoLight from "../../../assets/avatar-light.svg";
import progressLogoLight from "../../../assets/progress-light.svg";
import smileLogoLight from "../../../assets/smile-light.svg";
import smileLogoDark from "../../../assets/smile-dark.svg";
import { Routes } from "../../../infrastructure/routes";
import { MenuNavOption } from "./Menu/MenuNavOption";

export const SideNavbar: FC = () => {
    return (
        <div className="h-full">
            <nav className="absolute h-full  w-80 bg-blue-900 hidden lg:block">
                <NavOption to={Routes.Profile} text={"Профиль"} activeLogoSrc={avatarLogoDark} deactiveLogoSrc={avatarLogoLight}/>
                <NavOption to={Routes.Companies} text={"Компании"} activeLogoSrc={smileLogoDark} deactiveLogoSrc={smileLogoLight}/>
                <MenuNavOption to={Routes.Progress} text={"Прогресс"} logo={progressLogoLight} items={[{ id: "1", text: "bbc" }]} />
            </nav>
            <div className="flex w-full h-full lg:pl-80">
                <Outlet />
            </div>
        </div>
    );
}