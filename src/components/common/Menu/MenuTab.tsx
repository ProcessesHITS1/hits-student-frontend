import { FC } from "react";

export type MenuTabProps = {
    name: string;
    onPress: () => void;
    isSelected?: boolean;
};

export const MenuTab: FC<MenuTabProps> = props => {
    return (
        <div 
            onClick={props.onPress} 
            className={`px-5 hover:cursor-pointer`}
        >
            <div className={`items-center font-normal py-3 ${props.isSelected ? 'border-b-4 border-blue-900 text-blue-900 ' : ''}`}>
                {props.name}
            </div>
        </div>
    );
}