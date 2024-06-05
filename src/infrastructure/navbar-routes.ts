import { NavOptionProps } from "../components/common/NavOption";
import avatarLogoDark from "../assets/avatar-dark.svg";
import avatarLogoLight from "../assets/avatar-light.svg";
import progressLogoLight from "../assets/progress-light.svg";
import progressLogoDark from "../assets/progress-dark.svg";
import smileLogoLight from "../assets/smile-light.svg";
import smileLogoDark from "../assets/smile-dark.svg";
import { Routes } from "./routes";

export const navbarRoutes: NavOptionProps[] = [
    {
        text: "Профиль",
        activeLogoSrc: avatarLogoDark,
        deactiveLogoSrc: avatarLogoLight,
        to: Routes.Profile,
    },
    {
        text: "Компании",
        activeLogoSrc: smileLogoDark,
        deactiveLogoSrc: smileLogoLight,
        to: Routes.Companies,
    },
    {
        text: "Прогресс",
        activeLogoSrc: progressLogoDark,
        deactiveLogoSrc: progressLogoLight,
        to: "/interviews",
    },
];