import { Routes } from "../../../infrastructure/routes";
import { MenuNavOption } from "./Menu/MenuNavOption";
import { NavOption } from "./NavOption";
import avatarLogoDark from "../../../assets/avatar-dark.svg";
import avatarLogoLight from "../../../assets/avatar-light.svg";
import progressLogoLight from "../../../assets/progress-light.svg";
import smileLogoDark from "../../../assets/smile-dark.svg";
import smileLogoLight from "../../../assets/smile-light.svg";
import chatLogoDark from "../../../assets/chat-dark.svg";
import chatLogoLight from "../../../assets/chat-light.svg";
import { FC, useCallback } from "react";
import { Button } from "../Button";
import { H5 } from "../Headers";
import { forgetAccessToken } from "../../../infrastructure/access-token-storage";
import { useNavigate } from "react-router-dom";

type Props = {
    onLinkClick?: () => void;
}

export const NavOptionsContainer: FC<Props> = props => {
    
    const navigate = useNavigate();

    const onLogout = useCallback(() => {
        forgetAccessToken();
        navigate(Routes.Login);
    }, [navigate]);

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <nav className="w-full">
                <NavOption to={Routes.Profile} text={"Профиль"} activeLogoSrc={avatarLogoDark} deactiveLogoSrc={avatarLogoLight} onClick={props.onLinkClick}/>
                <NavOption to={Routes.Companies} text={"Компании"} activeLogoSrc={smileLogoDark} deactiveLogoSrc={smileLogoLight} onClick={props.onLinkClick}/>
                <NavOption to={Routes.Chats} text={"Сообщения"} activeLogoSrc={chatLogoDark} deactiveLogoSrc={chatLogoLight} onClick={props.onLinkClick}/>
                <MenuNavOption to={Routes.Progress} text={"Прогресс"} logo={progressLogoLight} items={[{ id: "1", text: "bbc" }]} onItemClick={props.onLinkClick}/>
            </nav>
            <Button className="my-2 w-full justify-start flex px-4" onClick={onLogout}>
                <H5 text={"< Выйти"} className="text-white"/>
            </Button>
        </div>
    );
}