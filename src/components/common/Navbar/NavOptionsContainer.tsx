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
import { FC, useCallback, useContext, useEffect } from "react";
import { Button } from "../Button";
import { H5 } from "../Headers";
import { forgetAccessToken } from "../../../infrastructure/access-token-storage";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../infrastructure/use-query";
import { requestApi } from "../../../infrastructure/api-clients";
import { SeasonContext } from "../../SeasonContextProvider";
import { RequestDataPaginatedItems } from "../../../api/clients/interview";

type Props = {
    onLinkClick?: () => void;
}

type QueryParams = {
    year: number;
}

type p = {
    what?: number;
}

export const NavOptionsContainer: FC<Props> = props => {
    const season = useContext(SeasonContext);
    const navigate = useNavigate();

    const onLogout = useCallback(() => {
        forgetAccessToken();
        navigate(Routes.Login);
    }, [navigate]);

    const { data: requests, refetch } = useQuery<QueryParams, RequestDataPaginatedItems>(
        params => requestApi.apiRequestMyGet([params.year]),
        { year: 2020 }, 
        false  
    );

    console.log(requests);

    useEffect(() => {
        if (season?.year === undefined) return;

        refetch({ year: season.year });
    }, [season])

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <nav className="w-full">
                <NavOption to={Routes.Profile} text={"Профиль"} activeLogoSrc={avatarLogoDark} deactiveLogoSrc={avatarLogoLight} onClick={props.onLinkClick}/>
                <NavOption to={Routes.Companies} text={"Компании"} activeLogoSrc={smileLogoDark} deactiveLogoSrc={smileLogoLight} onClick={props.onLinkClick}/>
                <NavOption to={Routes.Chats} text={"Сообщения"} activeLogoSrc={chatLogoDark} deactiveLogoSrc={chatLogoLight} onClick={props.onLinkClick}/>
                <MenuNavOption 
                    to={Routes.Progress} 
                    text={"Прогресс"} 
                    logo={progressLogoLight} 
                    items={requests ? requests.items!.map(x => ({ id: x.id, text: x.positionTitle ?? '' })) : []} 
                    onItemClick={props.onLinkClick}/>
            </nav>
            <Button className="my-2 w-full justify-start flex px-4" onClick={onLogout}>
                <H5 text={"< Выйти"} className="text-white"/>
            </Button>
        </div>
    );
}