import { FC, PropsWithChildren, useEffect } from "react"
import { useSetupAxios } from "../infrastructure/use-setup-axios"
import { getAccessToken } from "../infrastructure/access-token-storage";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SeasonContextProvider } from "./SeasonContextProvider";

export const Root: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useSetupAxios();

    useEffect(() => {
        if (import.meta.env.VITE_AUTH_ENABLED === "false") {
            return;
        }

        const token = getAccessToken();

        if (!token) navigate("/login");
        else if (
            location.pathname === '/' 
            || location.pathname === "/login"
        ) {
            navigate("profile");
        }
    }, [navigate]);

    return (
        <div className="static h-full">
            <Outlet />
        </div>
    )
}