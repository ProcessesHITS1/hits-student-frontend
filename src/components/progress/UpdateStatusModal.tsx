import { FC, useCallback, useContext, useState } from "react"
import ReactModal from "react-modal"
import { CommonText } from "../common/CommonText"
import closeIcon from "../../assets/close.svg";
import { CommonSelect } from "../common/CommonSelect"
import { SeasonContext } from "../SeasonContextProvider"
import { Button } from "../common/Button"
import { H5 } from "../common/Headers"
import { SingleValue } from "react-select";
import { requestApi } from "../../infrastructure/api-clients";
import { isRequestSuccessful } from "../../infrastructure/http-helpers";
import { useNavigate } from "react-router-dom";
import { ModalContainer } from "../common/ModalContainer";

type Props = ReactModal.Props & {
    requestId: string;
}

export const UpdateStatusModal: FC<Props> = props => {
    const { statusTemplates } = useContext(SeasonContext);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>();
    const navigate = useNavigate();

    const onSelect = useCallback(
        (v: SingleValue<{ value: string; label: string }>) => 
            setSelectedTemplateId(v?.value)
        , []);

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedTemplateId) return;
        const response = await requestApi.apiRequestRequestIdRequestStatusRequestStatusIdPut(
            props.requestId,
            selectedTemplateId
        );

        if (!isRequestSuccessful(response)) return;

        // reload page
        navigate(0);
    }, [selectedTemplateId, navigate, props.requestId]);

    return (
        <ModalContainer 
            {...props}
            header="Обновить статус"
        >
            <form className="flex flex-col justify-between w-full h-full" onSubmit={onSubmit}>
                {statusTemplates &&
                <CommonSelect
                    onChange={onSelect}
                    options={statusTemplates.map(x => ({ value: x.id!, label: x.name! }))} 
                />
                }
                <Button className="self-end px-2 bg-blue-400" type="submit">
                    <CommonText text="Создать" className="text-white"/>
                </Button>
            </form>
        </ModalContainer>
    )
}