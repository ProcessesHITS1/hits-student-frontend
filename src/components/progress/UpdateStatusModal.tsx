import { FC, useCallback, useContext, useState } from "react"
import ReactModal from "react-modal"
import { CommonText } from "../common/CommonText"
import closeIcon from "../../assets/close.svg";
import { CommonSelect } from "../common/CommonSelect"
import { useWindowDimensions } from "../../infrastructure/use-window-dimensions"
import { LARGE_SCREEN_BREAKPOINT_PX } from "../../infrastructure/constants"
import { SeasonContext } from "../SeasonContextProvider"
import { Button } from "../common/Button"
import { H5 } from "../common/Headers"
import { SingleValue } from "react-select";
import { requestApi } from "../../infrastructure/api-clients";
import { isRequestSuccessful } from "../../infrastructure/http-helpers";
import { useNavigate } from "react-router-dom";

type Props = ReactModal.Props & {
    requestId: string;
}

export const UpdateStatusModal: FC<Props> = props => {
    const { width } = useWindowDimensions();
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
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={{
                    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                    content: { inset: width > LARGE_SCREEN_BREAKPOINT_PX ? '25%' : '15%', padding: '20px', }
            }}
        >
            <div className="flex flex-col gap-4 w-full h-full">
                <div className="flex flex-row justify-between">
                    <H5 text="Обновить статус"/>
                    <img src={closeIcon} className="hover:cursor-pointer" onClick={props.onRequestClose}/>
                </div>
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
            </div>
        </ReactModal>
    )
}