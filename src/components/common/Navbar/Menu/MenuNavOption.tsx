import { FC, useState } from "react";
import { NavOptionHeader } from "../NavOptionHeader";
import closeMenuArrow from "../../../../assets/close-menu-arrow.svg";
import openMenuArrow from "../../../../assets/open-menu-arrow.svg";
import { SubOption } from "./SubOption";

type ItemProps = {
    id: string;
    text: string;
}

type Props = {
    text: string;
    to: string;
    logo: string;
    items: ItemProps[]
}

export const MenuNavOption: FC<Props> = props => {
    const [isOpened, setIsOpened] = useState(true);
    const toggleOpen = () => setIsOpened(v => !v);

    return (
        <div>
            <div className="flex flex-row items-center px-6 py-3 hover:cursor-pointer" onClick={toggleOpen}>
                <NavOptionHeader
                    text={props.text}
                    textColor="text-slate-100"
                    img={props.logo}
                />
                <img src={isOpened ? closeMenuArrow : openMenuArrow}/>
            </div>
            <div className="flex flex-col">
                {isOpened && props.items.map(item => <SubOption key={item.id} text={item.text} to={`${props.to}/${item.id}`}/>)}
            </div>
        </div>
    );
}