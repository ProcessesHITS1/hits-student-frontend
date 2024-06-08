import { FC, PropsWithChildren, useEffect } from "react"
import { useSetupAxios } from "../infrastructure/use-setup-axios"
import { getAccessToken } from "../infrastructure/access-token-storage";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Root: FC<PropsWithChildren> = props => {
    const navigate = useNavigate();
    const location = useLocation();
    useSetupAxios();

    useEffect(() => {
        const token = getAccessToken();

        if (!token) navigate("/login");
        else if (location.pathname === '/') navigate("profile");
    }, [navigate]);

    return (
        <div className="static h-full">
            <Outlet />
        </div>
    )
}