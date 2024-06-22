import { FC } from "react";
import Select from "react-select";

type Props = {
    options: { value: string, label: string }[]
};

export const CommonSelect: FC<Props> = props => {
    return (
        <Select className="w-full" options={props.options} onChange={v => console.log(v)}/>
    );
}