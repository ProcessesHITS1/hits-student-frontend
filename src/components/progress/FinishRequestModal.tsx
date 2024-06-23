import { FC, useCallback, useState } from "react";
import ReactModal from "react-modal";
import { ModalContainer } from "../common/ModalContainer";
import { Input } from "../common/Input";
import { RequestResultDataResultStatusEnum } from "../../api/clients/interview";
import { CommonSelect } from "../common/CommonSelect";
import { SingleValue } from "react-select";
import { requestApi } from "../../infrastructure/api-clients";
import { isRequestSuccessful } from "../../infrastructure/http-helpers";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../common/SubmitButton";
import { CommonText } from "../common/CommonText";

type Props = ReactModal.Props & {
    requestId: string;
}

export const FinishRequestModal: FC<Props> = props => {
    const [offerGiven, setOfferGiven] = useState(false);
    const [status, setStatus] = useState<RequestResultDataResultStatusEnum | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const navigate = useNavigate();

    const onSelect = useCallback((v: SingleValue<{ value: string; label: string; }>) => {
        if (!v?.value) return;
        setStatus(v?.value as RequestResultDataResultStatusEnum);
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!status) return;

        const response = await requestApi.apiRequestRequestIdResultStatusPut(
            props.requestId,
            {
                resultStatus: status,
                description: description,
                offerGiven: offerGiven
            }
        )

        if (!isRequestSuccessful(response)) return;
        navigate(0);
    };

    return (
        <ModalContainer 
            {...props}
            header="Завершить процесс прохождения"
        >
            <form className="flex flex-col h-full w-full justify-between" onSubmit={onSubmit}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <Input 
                            type="checkbox" 
                            placeholder="Offer given" 
                            onChange={e => setOfferGiven(e.target.checked)}
                            defaultChecked={false}
                            className="self-start w-6 h-6"
                        />
                        <CommonText text={"Предоставили оффер"} />
                    </div>
                    <CommonSelect 
                        options={[
                            { value: RequestResultDataResultStatusEnum.Accepted, label: "Принял оффер"},
                            { value: RequestResultDataResultStatusEnum.Rejected, label: "Отклонил оффер" }, 
                        ]} 
                        onChange={onSelect} 
                    />
                    <textarea
                        rows={5}
                        cols={30}
                        className="outline-none focus:outline-none border border-slate-200 resize-none p-2"
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <SubmitButton text="Завершить"/>
            </form>
        </ModalContainer>
    );
}