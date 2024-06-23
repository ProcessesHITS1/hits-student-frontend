import { FC } from "react";
import Select, { SingleValue } from "react-select";

type Props = {
    options: { value: string, label: string }[]
    placeholder?: string;
    onChange: (v: SingleValue<{ value: string, label: string}>) => void;
};

export const CommonSelect: FC<Props> = props => {
    return (
        <Select className="w-full" options={props.options} onChange={props.onChange} placeholder={props.placeholder}/>
    );
}