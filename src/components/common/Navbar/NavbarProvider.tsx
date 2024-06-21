import { LARGE_SCREEN_BREAKPOINT_PX } from "../../../infrastructure/constants";
import { useWindowDimensions } from "../../../infrastructure/use-window-dimensions";
import { BurgerNavbar } from "./BurgerNavbar";
import { SideNavbar } from "./SideNavbar";

export const NavbarProvider = () => {
    const { width } = useWindowDimensions();
    return (
        <div className="absolute top-0 w-full h-full">
            { width >= LARGE_SCREEN_BREAKPOINT_PX ? <SideNavbar /> : <BurgerNavbar /> }
        </div>
    );
}