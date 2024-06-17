import { Routes } from "../../../infrastructure/routes";
import { MenuNavOption } from "./Menu/MenuNavOption";
import { NavOption } from "./NavOption";
import avatarLogoDark from "../../../assets/avatar-dark.svg";
import avatarLogoLight from "../../../assets/avatar-light.svg";
import progressLogoLight from "../../../assets/progress-light.svg";
import smileLogoLight from "../../../assets/smile-light.svg";
import smileLogoDark from "../../../assets/smile-dark.svg";
import { FC } from "react";

type Props = {
    onLinkClick?: () => void;
}

export const NavOptionsContainer: FC<Props> = props => {
    return (
        <nav className="w-full">
            <NavOption to={Routes.Profile} text={"Профиль"} activeLogoSrc={avatarLogoDark} deactiveLogoSrc={avatarLogoLight} onClick={props.onLinkClick}/>
            <NavOption to={Routes.Companies} text={"Компании"} activeLogoSrc={smileLogoDark} deactiveLogoSrc={smileLogoLight} onClick={props.onLinkClick}/>
            <MenuNavOption to={Routes.Progress} text={"Прогресс"} logo={progressLogoLight} items={[{ id: "1", text: "bbc" }]} onItemClick={props.onLinkClick}/>
        </nav>
    );
}