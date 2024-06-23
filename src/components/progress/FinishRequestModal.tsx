import { FC, useCallback, useState } from "react";
import ReactModal from "react-modal";
import { ModalContainer } from "../common/ModalContainer";
import { Input } from "../common/Input";
import { RequestResultDataResultStatusEnum } from "../../api/clients/interview";
import { CommonSelect } from "../common/CommonSelect";
import { SingleValue } from "react-select";
import { Button } from "../common/Button";
import { CommonText } from "../common/CommonText";
import { requestApi } from "../../infrastructure/api-clients";
import { isRequestSuccessful } from "../../infrastructure/http-helpers";
import { useNavigate } from "react-router-dom";

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
            <form className="flex flex-col h-full w-full gap-4" onSubmit={onSubmit}>
                <Input 
                    type="checkbox" 
                    placeholder="Offer given" 
                    onChange={e => setOfferGiven(e.target.checked)}
                    defaultChecked={false}
                />
                <CommonSelect 
                    options={[
                        { value: RequestResultDataResultStatusEnum.Accepted, label: "Принято"},
                        { value: RequestResultDataResultStatusEnum.Rejected, label: "Отклонено" }, 
                    ]} 
                    onChange={onSelect} 
                />
                <textarea
                    rows={5}
                    cols={30}
                    className="outline-none focus:outline-none border border-slate-200 resize-none p-2"
                    onChange={e => setDescription(e.target.value)}
                />
                <Button className="self-end px-2 bg-blue-400" type="submit">
                    <CommonText text={"Завершить"} className="text-white"/>
                </Button>
            </form>
        </ModalContainer>
    );
}