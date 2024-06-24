import { FC, useCallback, useState } from "react"
import ReactModal from "react-modal"
import { SingleValue } from "react-select";
import { requestApi } from "../../infrastructure/api-clients";
import { isRequestSuccessful } from "../../infrastructure/http-helpers";
import { useNavigate } from "react-router-dom";
import { ModalContainer } from "../common/ModalContainer";
import { StatusTemplateSelect } from "../common/StatusTemplateSelect"
import { SubmitButton } from "../common/SubmitButton";

type Props = ReactModal.Props & {
    requestId: string;
}

export const UpdateStatusModal: FC<Props> = props => {
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
                <StatusTemplateSelect onSelect={onSelect} />
                <SubmitButton text="Создать" />
            </form>
        </ModalContainer>
    )
}