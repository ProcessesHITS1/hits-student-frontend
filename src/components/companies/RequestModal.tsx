import { FC, useCallback, useState } from "react";
import { ModalContainer } from "../common/ModalContainer";
import ReactModal from "react-modal";
import { SingleValue } from "react-select";
import { StatusTemplateSelect } from "../common/StatusTemplateSelect";
import { SubmitButton } from "../common/SubmitButton";
import { requestApi } from "../../infrastructure/api-clients";
import { isRequestSuccessful } from "../../infrastructure/http-helpers";
import { useNavigate } from "react-router-dom";

type Props = ReactModal.Props & {
    positionId: string;
}

export const RequestModal: FC<Props> = props => {
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>();
    const navigate = useNavigate();

    const onSelect = useCallback(
        (v: SingleValue<{ value: string; label: string }>) => 
            setSelectedTemplateId(v?.value)
        , []);

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedTemplateId) return;

        const response = await requestApi.apiRequestPositionPositionIdStatusRequestStatusIdPost(
            props.positionId,
            selectedTemplateId
        );

        if (!isRequestSuccessful(response)) return;
        navigate(0)
    }, [navigate, props.positionId, selectedTemplateId]);

    return (
        <ModalContainer
            header="Подать заявление" 
            {...props}
        >
            <form className="flex flex-col justify-between w-full h-full" onSubmit={onSubmit}>
                <StatusTemplateSelect onSelect={onSelect} />
                <SubmitButton text="Подать заявление" />
            </form>
        </ModalContainer>
    )
}