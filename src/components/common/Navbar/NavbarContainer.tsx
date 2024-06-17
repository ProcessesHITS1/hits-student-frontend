import { LARGE_SCREEN_BREAKPOINT_PX } from "../../../infrastructure/constants";
import { useWindowDimensions } from "../../../infrastructure/use-window-dimensions";
import { BurgerNavbar } from "./BurgerNavbar";
import { SideNavbar } from "./SideNavbar";

export const NavbarContainer = () => {
    const { width } = useWindowDimensions();
    return (
        <>
            { width >= LARGE_SCREEN_BREAKPOINT_PX ? <SideNavbar /> : <BurgerNavbar /> }
        </>
    );
}