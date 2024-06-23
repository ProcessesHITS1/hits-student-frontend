import { FC } from "react";
import ReactModal from "react-modal";
import { LARGE_SCREEN_BREAKPOINT_PX } from "../../infrastructure/constants";
import { useWindowDimensions } from "../../infrastructure/use-window-dimensions";
import { H5 } from "./Headers";
import closeIcon from "../../assets/close.svg";

type Props = ReactModal.Props & {
    header?: string
}

export const ModalContainer: FC<Props> = props => {
    const { width } = useWindowDimensions();
    
    return (
        <ReactModal
            {...props}
            style={{
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                content: { inset: width > LARGE_SCREEN_BREAKPOINT_PX ? '25%' : '15%', padding: '20px', }
            }}
        >
            <div className="flex flex-col gap-4 w-full h-full">
                <div className="flex flex-row justify-between">
                    {props.header && <H5 text={props.header}/> }
                    <img src={closeIcon} className="hover:cursor-pointer" onClick={props.onRequestClose}/>
                </div>
                <div className="flex w-full h-full">
                    {props.children}
                </div>
            </div>
        </ReactModal>
    )
}