import { useWindowDimensions } from "../../../infrastructure/use-window-dimensions";
import { BurgerNavbar } from "./BurgerNavbar";
import { SideNavbar } from "./SideNavbar";

const LARGE_SCREEN_BREAKPOINT_PX = 1024;

export const NavbarContainer = () => {
    const { width } = useWindowDimensions();
    return (
        <>
            { width >= LARGE_SCREEN_BREAKPOINT_PX ? <SideNavbar /> : <BurgerNavbar /> }
        </>
    );
}