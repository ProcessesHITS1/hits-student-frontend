import { FC, memo } from "react";
import { useSetupAxios } from "../infrastructure/useSetupAxios"

export const Initializer: FC = memo(() => {
    useSetupAxios();
    return <></>;
});