import { useState } from "react";
import { authApi } from "../infrastructure/api-clients";
import { PageWithHeader } from "./common/PageWithHeader";
import { UserInfoDto } from "../api/clients/auth";
import { useAsyncEffect } from "../infrastructure/use-async-effect";
import { setCurrentUserId } from "../infrastructure/user-info-storage";

export const Profile = () => {
    const [data, setData] = useState<UserInfoDto | undefined>();

    useAsyncEffect(async () => {
        const result = await authApi.getAuthenticatedUserInfo();

        if (!result.data.id) return;

        setCurrentUserId(result.data.id)
        setData(result.data);

    }, [setData]);

    return (
        <PageWithHeader headerText="hello is this imposter from among us" headerChildren={<span>sussy baka</span>}>
            <div className="flex h-full w-full content-center justify-center items-center">
                {
                    JSON.stringify(data, null, 2)
                }
            </div>
        </PageWithHeader>
    );
}