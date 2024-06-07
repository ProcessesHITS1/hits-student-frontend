import { useEffect, useState } from "react";
import { authApi } from "../infrastructure/api-clients";
import { PageWithHeader } from "./common/PageWithHeader";
import { UserInfoDto } from "../api/clients/auth";

export const Profile = () => {
    const [data, setData] = useState<UserInfoDto | undefined>();

    useEffect(() => {
        authApi.getAuthenticatedUserInfo().then(d => setData(d.data))
    }, [setData])

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