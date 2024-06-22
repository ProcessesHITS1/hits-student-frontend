import { useState } from "react";
import { NavOptionsContainer } from "./NavOptionsContainer";

export const BurgerNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(v => !v);

    return (
        <div className="relative w-full h-full">
            <div className="w-full bg-blue-900 p-4 sticky top-0 self-start h-auto z-20">
                <div className="w-10 h-10 bg-blue-400 hover:cursor-pointer" onClick={toggleOpen}></div>
            </div>
            {isOpen &&
                <div className="absolute w-full h-full bg-blue-900 top-0 right-0 z-10 pt-16">
                    <div className="w-full h-screen sticky top-0 mt-2 self-start">
                        <NavOptionsContainer onLinkClick={() => setIsOpen(false)}/>
                    </div>
                </div>
            }
        </div>
    );
}