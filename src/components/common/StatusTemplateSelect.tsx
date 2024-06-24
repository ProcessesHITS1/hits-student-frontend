import { FC, useContext } from "react";
import { SingleValue } from "react-select";
import { SeasonContext } from "../SeasonContextProvider";
import { CommonSelect } from "./CommonSelect";

type Props = {
    onSelect: (v: SingleValue<{ value: string; label: string }>) => void;
}

export const StatusTemplateSelect: FC<Props> = props => {
    const { statusTemplates } = useContext(SeasonContext);

    return (
        <>
            {statusTemplates && 
                <CommonSelect 
                    options={statusTemplates.map(x => ({ value: x.id!, label: x.name! }))} 
                    onChange={props.onSelect}
                    placeholder="Новый статус..."
                />
            }
        </>
    )
}